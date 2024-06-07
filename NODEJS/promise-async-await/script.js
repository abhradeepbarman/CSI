function fetchData(url) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const data = { name: 'Chandan', age: 21 };
        resolve(data);
      }, 1000);
    });
  }
  
  function processData(data) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        data.email = 'chandan@example.com';
        resolve(data);
      }, 1000);
    });
  }
  
  async function fetchDataAndProcess() {
    try {
      const data = await fetchData('example.com');
      console.log(data);
      const processedData = await processData(data);
      console.log('Processed data:', processedData);
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  fetchDataAndProcess();
  