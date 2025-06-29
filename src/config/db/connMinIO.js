import MinIO from 'minio';

const minioClient = new MinIO.Client({
  endPoint: process.env.MINIO_ENDPOINT || 'localhost',
  port: parseInt(process.env.MINIO_PORT) || 9000,
  useSSL: process.env.MINIO_USE_SSL === 'true',
  accessKey: process.env.MINIO_ACCESS_KEY || 'admin',
  secretKey: process.env.MINIO_SECRET_KEY || 'password',
});

// Kiểm tra kết nối MinIO khi khởi động
async function checkMinIOConnection() {
  try {
    await minioClient.listBuckets();
    console.log('✅ MinIO connected successfully');
  } catch (error) {
    console.error('❌ MinIO connection error:', error.message);
  }
}

export { minioClient, checkMinIOConnection };