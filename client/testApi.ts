import axios from "axios";

async function test() {
  try {
    const res = await axios.post(
      "http://localhost:5000/api/auth/login",
      {
        email: "test@test.com",
        password: "123456",
      }
    );

    console.log(res.data);
  } catch (err) {
    console.error(err);
  }
}

test();