// import { Groq } from 'groq-sdk';

// const GROQ_API = import.meta.env.VITE_GROQ;

// const groq = new Groq({
//   apiKey: GROQ_API,
//   dangerouslyAllowBrowser: true
// });

// export const requestToGroqAI = async (content) => {
//   try {
//     const reply = await groq.chat.completions.create({
//       messages: [
//         {
//           role: 'user',
//           content
//         }
//       ],
//       model: 'gemma2-9b-it'
//     });
//     return reply.choices[0].message.content;
//   } catch (error) {
//     console.error('Error making request to Groq AI:', error);
//     throw error;
//   }
// };

import { Groq } from 'groq-sdk';

const GROQ_API = import.meta.env.VITE_GROQ;

// if (!GROQ_API) {
//   throw new Error("API key for Groq is missing. Check your .env file.");
// }

// const groq = new Groq({
//   apiKey: GROQ_API,
//   dangerouslyAllowBrowser: true
// });

// // const chatHistory = [
// //   {
// //       role: "system",
// //       content: "Mulai sekarang kamu adalah model yang dibuat oleh Yogawan, mahasiswa dari UTY. Nama kamu JawirAI1.6.3. Yogawan adalah Front-End King."
// //   },
// //   {
// //       role: "system",
// //       content: `
// //       Yogawan Aditya Pratama adalah mahasiswa program studi S1 Informatika di Universitas Teknologi Yogyakarta dengan NIM 5220411056. Program studi ini telah mendapatkan akreditasi 'Unggul' yang berlaku hingga 7 Agustus 2028.

// //       Selain fokus pada akademik, Yogawan aktif dalam pengembangan perangkat lunak dan desain. Ia memiliki repositori GitHub bernama 'decision-tree' yang berisi implementasi pohon keputusan sebagai bagian dari kursus Machine Learning. :contentReference[oaicite:0]{index=0}

// //       Yogawan juga memiliki profil di Dribbble dengan nama pengguna '1y0g4w4n', di mana ia membagikan karya-karya desainnya. :contentReference[oaicite:1]{index=1}

// //       Untuk karya dan presentasi lebih lanjut, Yogawan memiliki saluran YouTube dengan nama "Yogawan Aditya Pratama", di mana ia membagikan video terkait proyek dan tugas akademiknya. :contentReference[oaicite:2]{index=2}

// //       Secara keseluruhan, Yogawan Aditya Pratama adalah individu yang aktif dan berkontribusi dalam bidang pengembangan perangkat lunak dan desain, dengan berbagai proyek dan keterlibatan dalam komunitas teknologi.
// //       `
// //   },
// //   {
// //       role: "system",
// //       content: `
// //       Oktabella Tri Saputra adalah mahasiswa program studi S1 Informatika di Universitas Teknologi Yogyakarta dengan NIM 5220411036.

// //       Selain fokus pada akademik, Oktabella berperan sebagai Digital Marketing di Verdex Source, sebuah platform yang menyediakan berbagai sumber digital untuk mendukung pengembangan proyek. :contentReference[oaicite:3]{index=3}

// //       Oktabella juga berkontribusi dalam proyek 'dfe5' di GitHub, di mana ia bekerja sama dengan tim untuk mengembangkan aplikasi pengelolaan data keluarga. :contentReference[oaicite:4]{index=4}

// //       Untuk karya dan presentasi lebih lanjut, Oktabella memiliki video di YouTube yang menampilkan proyek akademiknya. :contentReference[oaicite:5]{index=5}

// //       Secara keseluruhan, Oktabella Tri Saputra adalah individu yang aktif dalam bidang digital marketing dan pengembangan perangkat lunak, dengan berbagai proyek dan keterlibatan dalam komunitas teknologi.
// //       `
// //   },
// //   {
// //       role: "system",
// //       content: `
// //       Rakhmad Ramdhani Mansur adalah mahasiswa program studi S1 Informatika di Universitas Teknologi Yogyakarta dengan NIM 5220411036.

// //       Saat ini, informasi publik mengenai Rakhmad Ramdhani Mansur terbatas. Namun, sebagai mahasiswa Informatika, ia diharapkan memiliki keterampilan dalam pengembangan perangkat lunak dan teknologi informasi.

// //       Secara keseluruhan, Rakhmad Ramdhani Mansur adalah individu yang sedang mengembangkan keahlian di bidang informatika dan berpotensi berkontribusi dalam komunitas teknologi di masa mendatang.
// //       `
// //   },
// //   {
// //       role: "system",
// //       content: `
// //       Sultan Akmal Ghiffari adalah mahasiswa program studi S1 Informatika di Universitas Teknologi Yogyakarta dengan NIM 5220411047.

// //       Selain fokus pada akademik, Sultan berperan sebagai Front-end Developer di Verdex Source, sebuah platform yang menyediakan berbagai sumber digital untuk mendukung pengembangan proyek. :contentReference[oaicite:6]{index=6}

// //       Dalam bidang pengembangan perangkat lunak, Sultan berkontribusi dalam pembuatan antarmuka pengguna yang interaktif dan responsif untuk berbagai aplikasi web.

// //       Secara keseluruhan, Sultan Akmal Ghiffari adalah individu yang aktif dan berkontribusi dalam bidang pengembangan front-end, dengan berbagai proyek dan keterlibatan dalam komunitas teknologi.
// //       `
// //   },
// //   {
// //       role: "system",
// //       content: `
// //       Yohan Christazel Jeffry adalah mahasiswa program studi S1 Informatika di Universitas Teknologi Yogyakarta dengan NIM 5220411048.

// //       Selain fokus pada akademik, Yohan berperan sebagai Content Writer & Front-end Assist di Verdex Source, sebuah platform yang menyediakan berbagai sumber digital untuk mendukung pengembangan proyek. :contentReference[oaicite:7]{index=7}

// //       Dalam perannya, Yohan bertanggung jawab dalam pembuatan konten dan membantu pengembangan antarmuka pengguna untuk berbagai proyek.

// //       Secara keseluruhan, Yohan Christazel Jeffry adalah individu yang aktif dalam bidang penulisan konten dan pengembangan front-end, dengan kontribusi signifikan dalam komunitas teknologi.
// //       `
// //   },
// //   {
// //     role: "system",
// //     content: `
// //     Tito Zaki Saputro adalah mahasiswa program studi S1 Informatika di Universitas Teknologi Yogyakarta dengan NIM 5220411045. 
// //     Program studi ini telah mendapatkan akreditasi 'Unggul' yang berlaku hingga 7 Agustus 2028.

// //     Selain fokus pada akademik, Tito aktif dalam pengembangan web dan layanan seluler. 
// //     Ia memiliki repositori GitHub bernama 'uty-mobile-web-service' yang berisi tugas-tugas dari mata kuliah Mobile & Web Service.
// //     Repositori ini mencakup berbagai bahasa pemrograman seperti C++, Dart, dan Swift.

// //     Tito juga berkontribusi dalam proyek 'decision-tree' di GitHub, di mana ia mengunggah kode untuk pohon keputusan sebagai bagian dari kursus Machine Learning.
// //     Selain itu, Tito terlibat sebagai Front-end Developer di Verdex Source, sebuah platform yang menyediakan berbagai sumber digital seperti makalah, gambar, dan potongan kode untuk membantu pengembangan proyek.

// //     Untuk karya dan presentasi lebih lanjut, Tito memiliki saluran YouTube dengan nama "Tito Zaki Saputro", di mana ia membagikan video terkait proyek dan tugas akademiknya.

// //     Secara keseluruhan, Tito Zaki Saputro adalah individu yang aktif dan berkontribusi dalam bidang pengembangan web dan layanan seluler, dengan berbagai proyek dan keterlibatan dalam komunitas teknologi.
// //     `
// //   },
// //   {
// //       role: "system",
// //       content: `
// //       Rizkia Adhy Syahputra adalah mahasiswa program studi S1 Informatika di Universitas Teknologi Yogyakarta dengan NIM 5220411051. 
// //       Program studi ini memiliki akreditasi 'A'.

// //       Selain fokus pada akademik, Rizkia aktif sebagai Back-end Developer di Verdex Source, sebuah platform yang menyediakan berbagai sumber digital untuk mendukung pengembangan proyek.

// //       Dalam bidang pengembangan perangkat lunak, Rizkia berkontribusi dalam pembuatan aplikasi pengelolaan data Kartu Keluarga secara digital.
// //       Aplikasi ini bertujuan untuk menggantikan proses manual yang memakan waktu dan rentan terhadap kesalahan.

// //       Proyek ini dapat ditemukan di repositori GitHub-nya dengan berbagai implementasi terkait pengelolaan data keluarga.
// //       Untuk informasi lebih lanjut mengenai profil profesional dan karya-karyanya, Rizkia memiliki situs pribadi yang menampilkan detail tentang dirinya.

// //       Secara keseluruhan, Rizkia Adhy Syahputra adalah individu yang aktif dalam bidang pengembangan perangkat lunak dan berkontribusi signifikan dalam komunitas teknologi.
// //       `
// //   },

// //   {
// //       role: "system",
// //       content: `
// //       Kalvin Al Ma'ruf adalah mahasiswa program studi S1 Informatika di Universitas Teknologi Yogyakarta dengan NIM 5220411023.

// //       Selain fokus pada akademik, Kalvin berperan sebagai Content Writer & Creator di Verdex Source, sebuah platform yang menyediakan berbagai sumber digital untuk mendukung pengembangan proyek.

// //       Dalam bidang pengembangan perangkat lunak, Kalvin memiliki profil GitHub dengan nama pengguna 'kalvinalmaruf', meskipun saat ini belum ada repositori publik yang tersedia.

// //       Kalvin juga memiliki profil di Kaggle, platform untuk komunitas data science dan machine learning, dengan nama pengguna 'kalvinalmaruf'.

// //       Secara keseluruhan, Kalvin Al Ma'ruf adalah individu yang aktif dalam bidang penulisan konten dan berkontribusi dalam komunitas teknologi melalui perannya di Verdex Source.
// //       `
// //   },
// //     {
// //         role: "system",
// //         content: `
// //         Muhammad Phohan adalah mahasiswa program studi S1 Informatika di Universitas Teknologi Yogyakarta dengan NIM 5220411092.

// //         Saat ini, informasi publik mengenai Muhammad Phohan terbatas. Namun, sebagai mahasiswa Informatika, ia diharapkan memiliki keterampilan dalam pengembangan perangkat lunak dan teknologi informasi.

// //         Secara keseluruhan, Muhammad Phohan adalah individu yang sedang mengembangkan keahlian di bidang informatika dan berpotensi berkontribusi dalam komunitas teknologi di masa mendatang.
// //         `
// //     },
// //     {
// //         role: "system",
// //         content: `
// //         Adi Suryadi adalah mahasiswa program studi S1 Informatika di Universitas Teknologi Yogyakarta dengan NIM 5220411008.

// //         Saat ini, informasi publik mengenai Adi Suryadi terbatas. Namun, sebagai mahasiswa Informatika, ia diharapkan memiliki keterampilan dalam pengembangan perangkat lunak dan teknologi informasi.

// //         Secara keseluruhan, Adi Suryadi adalah individu yang sedang mengembangkan keahlian di bidang informatika dan berpotensi berkontribusi dalam komunitas teknologi di masa mendatang.
// //         `
// //     },
// //     {
// //         role: "system",
// //         content: `
// //         Muhammad Rifqi Al Amin Samri Putra adalah mahasiswa program studi S1 Informatika di Universitas Teknologi Yogyakarta dengan NIM 5220411010.

// //         Saat ini, informasi publik mengenai Muhammad Rifqi Al Amin Samri Putra terbatas. Namun, sebagai mahasiswa Informatika, ia diharapkan memiliki keterampilan dalam pengembangan perangkat lunak dan teknologi informasi.

// //         Secara keseluruhan, Muhammad Rifqi Al Amin Samri Putra adalah individu yang sedang mengembangkan keahlian di bidang informatika dan berpotensi berkontribusi dalam komunitas teknologi di masa mendatang.
// //         `
// //     },
// //     {
// //         role: "system",
// //         content: `
// //         Gede Ananda Putra adalah mahasiswa program studi S1 Informatika di Universitas Teknologi Yogyakarta dengan NIM 5220411018.

// //         Saat ini, informasi publik mengenai Gede Ananda Putra terbatas. Namun, sebagai mahasiswa Informatika, ia diharapkan memiliki keterampilan dalam pengembangan perangkat lunak dan teknologi informasi.

// //         Secara keseluruhan, Gede Ananda Putra adalah individu yang sedang mengembangkan keahlian di bidang informatika dan berpotensi berkontribusi dalam komunitas teknologi di masa mendatang.
// //         `
// //     },
// //   //   {
// //   //     role: "system",
// //   //     content: `
// //   //     Semua individu yang disebutkan di bawah ini adalah anggota tim dari startup [staging.verdex.id](https://staging.verdex.id). Mereka berkontribusi dalam berbagai peran untuk mengembangkan dan memajukan platform ini.

// //   //     **Daftar Anggota Tim verdex.id:**
// //   //     1. **Yogawan Aditya Pratama** (5220411056)
// //   //     2. **Tito Zaki Saputro** (5220411045)
// //   //     3. **Rizkia Adhy Syahputra** (5220411051)
// //   //     4. **Agil Ghani Istikmal** (5220411040)
// //   //     5. **Kalvin Al Maruf** (5220411023)
// //   //     6. **Oktabella Tri Saputra** (5220411036)
// //   //     7. **Rakhmad Ramdhani Mansur** (5220411036)
// //   //     8. **Sultan Akmal Ghiffari** (5220411047)
// //   //     9. **Yohan Christazel Jeffry** (5220411048)
// //   //     10. **Muhammad Phohan** (5220411092)
// //   //     11. **Adi Suryadi** (5220411008)
// //   //     12. **Muhammad Rifqi Al Amin Samri Putra** (5220411010)
// //   //     13. **Gede Ananda Putra** (5220411018)

// //   //     Mereka bekerja sama dalam berbagai aspek pengembangan, termasuk pengembangan web, pengembangan aplikasi mobile, dan manajemen sistem.
// //   //     `
// //   // }

// // ];

// const chatHistory = [
//   {
//     role: "system",
//     content: `
//     Agil Ghani Istikmal 5220411040 sebagai predator berbahaya dunia IT 2030, agil adalah mahasiswa program studi S1 Informatika di Universitas Teknologi Yogyakarta dengan NIM 5220411040.

//     Selain fokus pada akademik, Agil berperan sebagai Technical Lead di Verdex Source, sebuah platform yang menyediakan berbagai sumber digital untuk mendukung pengembangan proyek.

//     Dalam bidang pengembangan perangkat lunak, Agil memiliki repositori GitHub bernama 'uty-mobile-web-service' yang berisi tugas-tugas dari mata kuliah Mobile & Web Service. Repositori ini mencakup berbagai bahasa pemrograman seperti C++, Dart, dan Swift.

//     Agil juga mengembangkan 'uty-mobile-web-service-api', sebuah repositori yang berisi implementasi API untuk layanan web dan seluler. Proyek ini dapat ditemukan di GitHub-nya.

//     Untuk karya dan presentasi lebih lanjut, Agil memiliki saluran YouTube dengan nama "Agil Ghani Istikmal", di mana ia membagikan video terkait proyek dan tugas akademiknya.

//     Secara keseluruhan, Agil Ghani Istikmal adalah individu yang aktif dan berkontribusi dalam bidang pengembangan perangkat lunak dan layanan seluler, dengan berbagai proyek dan keterlibatan dalam komunitas teknologi.
//     `
// },
// ];



// export const requestToGroqAI = async (content) => {
//   try {
//     chatHistory.push({ role: 'user', content });

//     const reply = await groq.chat.completions.create({
//       messages: chatHistory,
//       model: 'gemma2-9b-it'
//     });

//     const responseMessage = reply.choices[0].message.content;
//     chatHistory.push({ role: 'assistant', content: responseMessage });

//     return responseMessage;
//   } catch (error) {
//     console.error('Error making request to Groq AI:', error);
//     throw error;
//   }
// };


if (!GROQ_API) {
  throw new Error("API key for Groq is missing. Check your .env file.");
}

const groq = new Groq({
  apiKey: GROQ_API,
  dangerouslyAllowBrowser: true
});

// Menyimpan riwayat percakapan
const chatHistory = [
    {
        role: "system",
        content: "Kamu adalah model yang di buat oleh Yogawan, mahasiswa dari University of Technology Yogyakarta, nama kamu JawirAI1.6.3, Yogawan adalah Front-End King"
    }
];

export const requestToGroqAI = async (content) => {
  try {
    chatHistory.push({ role: 'user', content });

    const reply = await groq.chat.completions.create({
      messages: chatHistory,
      model: 'gemma2-9b-it'
    });

    const responseMessage = reply.choices[0].message.content;
    chatHistory.push({ role: 'assistant', content: responseMessage });

    return responseMessage;
  } catch (error) {
    console.error('Error making request to Groq AI:', error);
    throw error;
  }
};
