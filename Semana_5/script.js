// Obtener elementos del DOM
const imageUrlInput = document.getElementById('imageUrlInput');
const addImageBtn = document.getElementById('addImageBtn');
const deleteImageBtn = document.getElementById('deleteImageBtn');
const imageGallery = document.getElementById('imageGallery');

let selectedImage = null; // Almacena la imagen seleccionada

// Función para seleccionar una imagen
function selectImage(imageElement) {
    // Quita la selección de la imagen anterior (si existe)
    if (selectedImage) {
        selectedImage.classList.remove('selected');
    }
    // Añade la selección a la nueva imagen
    imageElement.classList.add('selected');
    selectedImage = imageElement;
}

// Función para agregar una imagen
function addImage() {
    const imageUrl = imageUrlInput.value.trim();
    if (!imageUrl) {
        alert('Ingresa una URL de imagen.');
        return;
    }

    const newImage = document.createElement('img');
    newImage.src = imageUrl;
    newImage.alt = 'Imagen de la galería';
    newImage.classList.add('gallery-image');

    // Manejar error si la imagen no carga
    newImage.onerror = () => {
        newImage.src = 'https://placehold.co/300x200/CCCCCC/666666?text=Error';
    };

    // Añadir listener para seleccionar al hacer clic
    newImage.addEventListener('click', () => selectImage(newImage));

    imageGallery.appendChild(newImage);
    imageUrlInput.value = ''; // Limpiar input
}

// Función para eliminar la imagen seleccionada
function deleteSelectedImage() {
    if (selectedImage) {
        imageGallery.removeChild(selectedImage);
        selectedImage = null; // Deseleccionar
    } else {
        alert('Selecciona una imagen para eliminar.');
    }
}

// Event Listeners
addImageBtn.addEventListener('click', addImage);
deleteImageBtn.addEventListener('click', deleteSelectedImage);

// Añadir listeners a imágenes existentes al cargar
document.querySelectorAll('.gallery-image').forEach(image => {
    image.addEventListener('click', () => selectImage(image));
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Delete' || event.key === 'Backspace') {
        event.preventDefault(); // Evita navegar hacia atrás
        deleteSelectedImage();
    }
    if (event.key === 'Enter' && document.activeElement === imageUrlInput) {
        addImage();
    }
});