(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })

  const MAX_IMAGE_SIZE_MB = 5
  const imageInputs = document.querySelectorAll('input[type="file"][name="image"]')

  imageInputs.forEach(input => {
    input.setAttribute('accept', 'image/*')
    input.addEventListener('change', () => {
      const file = input.files[0]

      if (file && file.size > MAX_IMAGE_SIZE_MB * 1024 * 1024) {
        alert(`File too large! Max ${MAX_IMAGE_SIZE_MB} MB allowed.`)
        input.value = ''
      }
    })
  })
})()