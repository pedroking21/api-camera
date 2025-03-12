
// Obtendo os elementos necessários
const video = document.getElementById('video');
const captureButton = document.getElementById('captureButton');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const capturedImage = document.getElementById('capturedImage');

// Função para verificar a compatibilidade com a API de câmera
function checkCameraSupport() {
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    alert("Seu navegador não é compatível com a captura de vídeo.");
    return false;
  }
  return true;
}

// Função para iniciar o stream da câmera
async function startCamera() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;
  } catch (err) {
    console.error('Erro ao acessar a câmera: ', err);
    alert("Erro ao acessar a câmera. Verifique as permissões.");
  }
}

// Função para capturar a imagem do vídeo e desenhá-la no canvas
function captureImage() {
  // Definindo as dimensões do canvas para a mesma do vídeo
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  // Desenhando o conteúdo do vídeo no canvas
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

  // Exibindo a imagem capturada
  const imageDataURL = canvas.toDataURL('image/png');
  capturedImage.src = imageDataURL;
  capturedImage.style.display = 'block';
}

// Verificando a compatibilidade do navegador e iniciando a câmera
if (checkCameraSupport()) {
  // Pedindo permissão ao usuário para acessar a câmera
  startCamera();
}

// Adicionando evento de captura de imagem
captureButton.addEventListener('click', captureImage);
