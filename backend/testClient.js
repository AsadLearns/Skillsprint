import axios from 'axios';

const testClient = async () => {
  try {
    // Let's login first
    console.log("Logging in...");
    const loginRes = await axios.post('http://localhost:8000/api/auth/login', {
      email: 'asadj@example.com', // Let's use a dummy or registered user
      password: 'password123'
    });
    
    const token = loginRes.data.token;
    console.log("Logged in! Token obtained.");
    
    // Now request study content for React roadmap (6a4753edcfebb5181e8f1329) Week 1
    const roadmapId = '6a4753edcfebb5181e8f1329';
    const weekNumber = 1;
    
    console.log(`Fetching study content for Week ${weekNumber}...`);
    const start = Date.now();
    const res = await axios.get(`http://localhost:8000/api/roadmap/${roadmapId}/weeks/${weekNumber}/study`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const end = Date.now();
    
    console.log(`Response received in ${end - start}ms`);
    console.log(`Study Content Length: ${res.data.studyContent?.length}`);
    console.log("First 200 characters:");
    console.log(res.data.studyContent?.substring(0, 200));
  } catch (err) {
    console.error("Client test error:", err.response?.data || err.message);
  }
};

testClient();
