// Error Text
const errorMessage = document.querySelector('.validation-error');

// Result Text
const result = document.getElementById('result');
const BMIResult = document.getElementById('BMIResult');
const BMICategory = document.getElementById('BMICategory');

/**
 * Get data from inputs
 * @returns {weight: number, height: number}
 */
function handleGetFormData() {
	const weight = parseInt(document.getElementById('weight').value);
	const height = parseInt(document.getElementById('height').value);

	return { weight, height };
}

/**
 * Validate input values
 * @param {weight: number, height: number}
 * @returns boolean
 */
function validateInputValues({ weight, height }) {
	if (!weight || !height) {
		message = `There's something wrong. Please fill your ${
			!weight ? 'weight' : 'height'
		}.`;

		return [false, message];
	}

	if (isNaN(weight) || isNaN(height)) {
		message = `There's something wrong. Please fill your weight and height with number.`;

		return [false, message];
	}

	return [true, null];
}

/**
 * Calculate BMI
 * @param {weight: number, height: number}
 * @returns number
 */
function calculateBMI({ weight, height }) {
	return (weight / (height / 100) ** 2).toFixed(1);
}

/**
 * Get category BMI
 * @param BMI: number
 * @returns string
 */
function categoryBMI(BMI) {
	let category;

	if (BMI < 18.5) {
		category = 'Underweight';
	} else if (BMI < 25) {
		category = 'Normal';
	} else if (BMI < 30) {
		category = 'Overweight';
	} else {
		category = 'Obesity';
	}

	return category;
}

/**
 * Submit form
 * @returns any
 */
function handleSubmit() {
	event.preventDefault();

	// Get form dataa
	const formData = handleGetFormData();
	// Get validate input values
	const [isValid, message] = validateInputValues(formData);

	// Check is valid
	if (!isValid) {
		// Check if (any) previous result is hidden or not
		!result.classList.contains('hidden') && result.classList.add('hidden');

		// Display error message text
		errorMessage.classList.remove('hidden');
		errorMessage.innerHTML = message;

		return;
	}

	// Get BMI and category result
	BMI = calculateBMI(formData);
	category = categoryBMI(BMI);

	// Check if (any) previous error message is hidden or not
	if (!errorMessage.classList.contains('hidden')) {
		errorMessage.classList.add('hidden');
	}

	// Display result
	result.classList.remove('hidden');
	BMIResult.innerHTML = BMI;
	BMICategory.innerHTML = category;
}

// Event listener onSubmit form
document
	.getElementsByTagName('form')[0]
	.addEventListener('submit', () => handleSubmit());
