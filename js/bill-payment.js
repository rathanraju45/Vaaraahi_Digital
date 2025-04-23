document.addEventListener('DOMContentLoaded', () => {
    const billPaymentForm = document.getElementById('billPaymentForm');
    const serviceTypeSelect = document.getElementById('serviceType');
    const mobileFields = document.getElementById('mobileFields');
    const otherFields = document.getElementById('otherFields');
    const stateSelect = document.getElementById('state');
    const operatorSelect = document.getElementById('operator');
    const rechargePlanSelect = document.getElementById('rechargePlan');

    // Mobile recharge plans data
    const rechargePlans = {
        airtel: {
            AP: {
                prepaid: [
                    { amount: 299, description: "28 days, Unlimited calls, 1.5GB/day data, 100 SMS/day" },
                    { amount: 479, description: "56 days, Unlimited calls, 1.5GB/day data, 100 SMS/day" },
                    { amount: 699, description: "84 days, Unlimited calls, 2GB/day data, 100 SMS/day" }
                ],
                postpaid: [
                    { amount: 499, description: "Monthly, Unlimited calls, 75GB data, 100 SMS/day" },
                    { amount: 749, description: "Monthly, Unlimited calls, 125GB data, 100 SMS/day" }
                ]
            },
            KA: {
                prepaid: [
                    { amount: 299, description: "28 days, Unlimited calls, 2GB/day data, 100 SMS/day" },
                    { amount: 479, description: "56 days, Unlimited calls, 2GB/day data, 100 SMS/day" },
                    { amount: 699, description: "84 days, Unlimited calls, 2.5GB/day data, 100 SMS/day" }
                ],
                postpaid: [
                    { amount: 499, description: "Monthly, Unlimited calls, 75GB data, 100 SMS/day" },
                    { amount: 749, description: "Monthly, Unlimited calls, 125GB data, 100 SMS/day" }
                ]
            }
        },
        bsnl: {
            AP: {
                prepaid: [
                    { amount: 199, description: "30 days, Unlimited calls, 1GB/day data, 100 SMS/day" },
                    { amount: 399, description: "60 days, Unlimited calls, 1GB/day data, 100 SMS/day" },
                    { amount: 599, description: "90 days, Unlimited calls, 1.5GB/day data, 100 SMS/day" }
                ],
                postpaid: [
                    { amount: 399, description: "Monthly, Unlimited calls, 50GB data, 100 SMS/day" },
                    { amount: 599, description: "Monthly, Unlimited calls, 100GB data, 100 SMS/day" }
                ]
            },
            KA: {
                prepaid: [
                    { amount: 199, description: "30 days, Unlimited calls, 1GB/day data, 100 SMS/day" },
                    { amount: 399, description: "60 days, Unlimited calls, 1GB/day data, 100 SMS/day" },
                    { amount: 599, description: "90 days, Unlimited calls, 1.5GB/day data, 100 SMS/day" }
                ],
                postpaid: [
                    { amount: 399, description: "Monthly, Unlimited calls, 50GB data, 100 SMS/day" },
                    { amount: 599, description: "Monthly, Unlimited calls, 100GB data, 100 SMS/day" }
                ]
            }
        },
        jio: {
            AP: {
                prepaid: [
                    { amount: 239, description: "28 days, Unlimited calls, 1.5GB/day data, 100 SMS/day" },
                    { amount: 479, description: "56 days, Unlimited calls, 1.5GB/day data, 100 SMS/day" },
                    { amount: 666, description: "84 days, Unlimited calls, 2GB/day data, 100 SMS/day" }
                ],
                postpaid: [
                    { amount: 399, description: "Monthly, Unlimited calls, 75GB data, 100 SMS/day" },
                    { amount: 699, description: "Monthly, Unlimited calls, 150GB data, 100 SMS/day" }
                ]
            },
            KA: {
                prepaid: [
                    { amount: 239, description: "28 days, Unlimited calls, 1.5GB/day data, 100 SMS/day" },
                    { amount: 479, description: "56 days, Unlimited calls, 1.5GB/day data, 100 SMS/day" },
                    { amount: 666, description: "84 days, Unlimited calls, 2GB/day data, 100 SMS/day" }
                ],
                postpaid: [
                    { amount: 399, description: "Monthly, Unlimited calls, 75GB data, 100 SMS/day" },
                    { amount: 699, description: "Monthly, Unlimited calls, 150GB data, 100 SMS/day" }
                ]
            }
        },
        vi: {
            AP: {
                prepaid: [
                    { amount: 269, description: "28 days, Unlimited calls, 1.5GB/day data, 100 SMS/day" },
                    { amount: 479, description: "56 days, Unlimited calls, 1.5GB/day data, 100 SMS/day" },
                    { amount: 699, description: "84 days, Unlimited calls, 2GB/day data, 100 SMS/day" }
                ],
                postpaid: [
                    { amount: 399, description: "Monthly, Unlimited calls, 40GB data, 100 SMS/day" },
                    { amount: 699, description: "Monthly, Unlimited calls, 100GB data, 100 SMS/day" }
                ]
            },
            KA: {
                prepaid: [
                    { amount: 269, description: "28 days, Unlimited calls, 1.5GB/day data, 100 SMS/day" },
                    { amount: 479, description: "56 days, Unlimited calls, 1.5GB/day data, 100 SMS/day" },
                    { amount: 699, description: "84 days, Unlimited calls, 2GB/day data, 100 SMS/day" }
                ],
                postpaid: [
                    { amount: 399, description: "Monthly, Unlimited calls, 40GB data, 100 SMS/day" },
                    { amount: 699, description: "Monthly, Unlimited calls, 100GB data, 100 SMS/day" }
                ]
            }
        }
    };

    // Event listeners for form field changes
    serviceTypeSelect?.addEventListener('change', handleServiceTypeChange);
    stateSelect?.addEventListener('change', updatePlans);
    operatorSelect?.addEventListener('change', updatePlans);
    document.getElementById('rechargeType')?.addEventListener('change', updatePlans);

    if (billPaymentForm) {
        billPaymentForm.addEventListener('submit', handleBillPayment);
    }

    // Handle service type change
    function handleServiceTypeChange() {
        const selectedService = serviceTypeSelect.value;
        if (selectedService === 'mobile') {
            mobileFields.classList.remove('hidden');
            otherFields.classList.add('hidden');
            // Reset and make mobile fields required
            ['state', 'operator', 'mobileNumber', 'rechargeType', 'rechargePlan'].forEach(id => {
                const element = document.getElementById(id);
                if (element) element.required = true;
            });
            // Make other fields not required
            ['consumerNumber', 'amount'].forEach(id => {
                const element = document.getElementById(id);
                if (element) element.required = false;
            });
        } else {
            mobileFields.classList.add('hidden');
            otherFields.classList.remove('hidden');
            // Reset and make other fields required
            ['consumerNumber', 'amount'].forEach(id => {
                const element = document.getElementById(id);
                if (element) element.required = true;
            });
            // Make mobile fields not required
            ['state', 'operator', 'mobileNumber', 'rechargeType', 'rechargePlan'].forEach(id => {
                const element = document.getElementById(id);
                if (element) element.required = false;
            });
        }
    }

    // Update recharge plans based on selections
    function updatePlans() {
        const state = stateSelect.value;
        const operator = operatorSelect.value;
        const rechargeType = document.getElementById('rechargeType').value;
        const planSelect = document.getElementById('rechargePlan');

        // Clear existing options
        planSelect.innerHTML = '<option value="">Select Plan</option>';

        if (state && operator && rechargeType && rechargePlans[operator]?.[state]?.[rechargeType]) {
            const plans = rechargePlans[operator][state][rechargeType];
            plans.forEach(plan => {
                const option = document.createElement('option');
                option.value = plan.amount;
                option.textContent = `₹${plan.amount} - ${plan.description}`;
                planSelect.appendChild(option);
            });
        }
    }

    // Handle form submission
    function handleBillPayment(e) {
        e.preventDefault();
        const serviceType = serviceTypeSelect.value;

        if (serviceType === 'mobile') {
            const mobileNumber = document.getElementById('mobileNumber').value;
            const state = stateSelect.value;
            const operator = operatorSelect.value;
            const rechargeType = document.getElementById('rechargeType').value;
            const planAmount = document.getElementById('rechargePlan').value;

            // Validate mobile number
            if (!/^[0-9]{10}$/.test(mobileNumber)) {
                alert('Please enter a valid 10-digit mobile number');
                return;
            }

            // Process mobile recharge
            alert(`Mobile recharge of ₹${planAmount} for ${mobileNumber} (${operator} ${rechargeType}) processed successfully!`);
        } else {
            const billType = serviceType;
            const consumerNumber = document.getElementById('consumerNumber').value;
            const amount = document.getElementById('amount').value;

            // Process other bill payments
            alert(`Payment of ₹${amount} for ${billType} bill processed successfully!`);
        }

        // Clear the form
        e.target.reset();
        handleServiceTypeChange();
    }

    // Initialize form state
    handleServiceTypeChange();
});