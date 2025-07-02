<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Permohonan Nikah Diverifikasi</title>
</head>
<body style="margin: 0; padding: 2rem; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f9fafb; color: #2d3748;">
  <div style="max-width: 600px; margin: 0 auto; background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 5px 15px rgba(0,0,0,0.05);">
    <h2 style="color: #187f80; margin-bottom: 1rem;">✅ Permohonan Nikah Kamu Sudah Diverifikasi!</h2>

    <p style="font-size: 16px; margin-bottom: 1rem;">
      Yeay! Permohonan nikah kamu telah diverifikasi. Surat Kesehatan & Bimbingan Keluarga kamu sudah siap. Jangan lupa cek jadwal bimbingannya yaa! 📅
    </p>

    <div style="margin-bottom: 1.5rem;">
      <p style="font-size: 16px; margin-bottom: 0.3rem;"><strong>👨 Mempelai Pria:</strong> {{ $permohonanNikah->mempelaiPria->nama_lengkap }}</p>
      <p style="font-size: 16px; margin-bottom: 0.3rem;"><strong>👰 Mempelai Wanita:</strong> {{ $permohonanNikah->mempelaiWanita->nama_lengkap }}</p>
      <p style="font-size: 16px; margin-bottom: 0.3rem;"><strong>📅 Tanggal Diverifikasi:</strong> {{ $permohonanNikah->latestStatus->created_at->format('d F Y') }}</p>
    </div>

    <p style="font-size: 14px; color: #718096; margin-top: 2rem;">Email ini dikirim otomatis. Jangan dibalas yaa 🙏</p>
  </div>
</body>
</html>
