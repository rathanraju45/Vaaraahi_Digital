document.addEventListener('DOMContentLoaded', () => {
    const rechargeForm = document.getElementById('rechargeForm');
    const stateSelect = document.getElementById('state');
    const planCategories = document.getElementById('planCategories');
    const planSelection = document.getElementById('planSelection');
    const planList = document.getElementById('planList');
    const proceedButton = document.getElementById('proceedButton');
    let selectedOperator = null;
    let currentPlans = null;
    let selectedPlan = null;
    const categories = ['unlimited', 'data', 'talktime', 'isd'];

    // Event Listeners
    stateSelect.addEventListener('change', handleStateChange);
    document.querySelectorAll('.operator-option').forEach(option => {
        option.addEventListener('click', handleOperatorSelection);
    });
    
    // Add scroll event listener to plan list
    planList.addEventListener('scroll', handlePlanListScroll);

    // Initialize with Andhra Pradesh selected
    loadOperatorPlans();

    // Handle operator selection
    async function handleOperatorSelection(e) {
        const operatorCard = e.currentTarget;
        selectedOperator = operatorCard.dataset.operator;

        // Update visual selection
        document.querySelectorAll('.operator-option').forEach(option => {
            option.classList.remove('border-blue-500', 'border-2');
        });
        operatorCard.classList.add('border-blue-500', 'border-2');

        // Load plans for selected operator and state
        await loadOperatorPlans();
        displayAllPlans();
    }

    // Handle state selection
    async function handleStateChange() {
        await loadOperatorPlans();
        if (selectedOperator) {
            displayAllPlans();
        }
    }

    // Load operator plans from JSON file
    async function loadOperatorPlans() {
        if (!selectedOperator) return;
        
        const state = stateSelect.value;
        const stateName = state === 'AP' ? 'Andhra_Pradesh' : 'Karnataka';
        try {
            const response = await fetch(`../Docs/${stateName}/${selectedOperator}-${stateName.toLowerCase().replace('_', '-')}.json`);
            const data = await response.json();
            currentPlans = data[selectedOperator];
            console.log('Loaded plans:', currentPlans);
        } catch (error) {
            console.error('Error loading plans:', error);
            currentPlans = null;
        }
    }

    // Display all plans grouped by category
    function displayAllPlans() {
        if (!currentPlans) {
            planList.innerHTML = '<p class="text-gray-600">No plans available</p>';
            return;
        }

        planList.innerHTML = '';
        planSelection.classList.remove('hidden');
        
        // Create category headers and plan groups
        categories.forEach(category => {
            if (currentPlans[category] && Object.keys(currentPlans[category]).length > 0) {
                const categorySection = document.createElement('div');
                categorySection.className = 'mb-8';
                categorySection.id = `category-${category}`;
                
                const categoryHeader = document.createElement('h3');
                categoryHeader.className = 'text-lg font-semibold mb-4 sticky top-0 bg-white py-2';
                categoryHeader.textContent = getCategoryDisplayName(category);
                categorySection.appendChild(categoryHeader);

                const plans = currentPlans[category];
                Object.entries(plans).forEach(([price, details]) => {
                    const planCard = createPlanCard(price, details);
                    categorySection.appendChild(planCard);
                });

                planList.appendChild(categorySection);
            }
        });

        // Show proceed button but disable it until a plan is selected
        proceedButton.classList.remove('hidden');
        updateProceedButton();
    }

    // Create a plan card element
    function createPlanCard(price, details) {
        const planCard = document.createElement('div');
        planCard.className = 'plan-card flex items-start p-4 border rounded-lg hover:border-blue-500 hover:shadow-md transition-all cursor-pointer mb-4';
        planCard.dataset.price = price;
        planCard.dataset.validity = details.validity || 'N/A';
        planCard.dataset.description = JSON.stringify(details);

        const formattedDetails = [];
        if (details.calls) formattedDetails.push(details.calls);
        if (details.data) formattedDetails.push(details.data);
        if (details.sms) formattedDetails.push(details.sms);
        if (details.details) formattedDetails.push(details.details);

        planCard.innerHTML = `
            <div class="flex-shrink-0 w-32 text-center">
                <div class="text-2xl font-bold text-blue-600">₹${price}</div>
                <div class="text-sm text-gray-600">${details.validity || 'N/A'}</div>
            </div>
            <div class="flex-grow pl-6 border-l">
                <p class="text-gray-700">${formattedDetails.join(' | ')}</p>
            </div>
            <input type="radio" name="plan" value="${price}" class="ml-4 mt-2">
        `;

        planCard.addEventListener('click', () => {
            planCard.querySelector('input[type="radio"]').checked = true;
            handlePlanSelection(planCard);
        });

        return planCard;
    }

    // Handle plan selection
    function handlePlanSelection(planCard) {
        document.querySelectorAll('.plan-card').forEach(card => {
            card.classList.remove('border-blue-500', 'bg-blue-50');
            card.classList.add('border-gray-200');
        });

        planCard.classList.remove('border-gray-200');
        planCard.classList.add('border-blue-500', 'bg-blue-50');
        
        selectedPlan = {
            price: planCard.dataset.price,
            validity: planCard.dataset.validity,
            description: planCard.dataset.description
        };
        
        updateProceedButton();
        
        // Update category selection based on the selected plan
        const categorySection = planCard.closest('[id^="category-"]');
        if (categorySection) {
            const category = categorySection.id.replace('category-', '');
            updateCategorySelection(category);
        }
    }

    // Handle plan list scrolling
    function handlePlanListScroll() {
        const scrollPosition = planList.scrollTop;
        const categories = planList.querySelectorAll('[id^="category-"]');
        
        let currentCategory = null;
        categories.forEach(category => {
            const rect = category.getBoundingClientRect();
            if (rect.top <= 150) { // Adjust this value based on your layout
                currentCategory = category.id.replace('category-', '');
            }
        });

        if (currentCategory) {
            updateCategorySelection(currentCategory, false);
        }
    }

    // Update category button selection
    function updateCategorySelection(category, scroll = true) {
        document.querySelectorAll('.plan-category').forEach(button => {
            if (button.dataset.category === category) {
                button.classList.remove('border-gray-300', 'text-gray-700');
                button.classList.add('border-blue-500', 'text-blue-500');
                if (scroll) {
                    document.getElementById(`category-${category}`)?.scrollIntoView({ behavior: 'smooth' });
                }
            } else {
                button.classList.remove('border-blue-500', 'text-blue-500');
                button.classList.add('border-gray-300', 'text-gray-700');
            }
        });
    }

    // Get display name for category
    function getCategoryDisplayName(category) {
        const displayNames = {
            'unlimited': 'Unlimited Plans',
            'data': 'Data Plans',
            'talktime': 'Talktime',
            'isd': 'ISD Plans'
        };
        return displayNames[category] || category;
    }

    // Update proceed button state
    function updateProceedButton() {
        const submitButton = proceedButton.querySelector('button');
        
        if (selectedPlan) {
            submitButton.disabled = false;
            submitButton.classList.remove('bg-gray-400', 'cursor-not-allowed');
            submitButton.classList.add('bg-blue-600', 'hover:bg-blue-700');
        } else {
            submitButton.disabled = true;
            submitButton.classList.add('bg-gray-400', 'cursor-not-allowed');
            submitButton.classList.remove('bg-blue-600', 'hover:bg-blue-700');
        }
    }

    // Handle form submission
    rechargeForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!selectedPlan) {
            alert('Please select a recharge plan');
            return;
        }

        // Handle payment processing
        const paymentDetails = {
            amount: selectedPlan.price,
            operator: selectedOperator,
            state: stateSelect.value
        };

        console.log('Processing payment:', paymentDetails);
        alert(`Initiating payment of ₹${paymentDetails.amount}`);
        
        // Reset form after successful payment
        rechargeForm.reset();
        selectedPlan = null;
        selectedOperator = null;
        currentPlans = null;
        document.querySelectorAll('.operator-option').forEach(option => {
            option.classList.remove('border-blue-500', 'border-2');
        });
        planList.innerHTML = '';
        proceedButton.classList.add('hidden');
    });

    // Add click handlers for category buttons
    document.querySelectorAll('.plan-category').forEach(button => {
        button.addEventListener('click', (e) => {
            const category = e.currentTarget.dataset.category;
            updateCategorySelection(category);
        });
    });
});