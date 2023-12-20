const BASE_URL = 'http://localhost:3000/mahasiswa';

async function addStudent(payload) {
  try {
    const response = await fetch(BASE_URL + '/new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    }).then((res) => res.json());
    console.log(response);
  } catch (error) {
    console.error(error.message);
  }
}
