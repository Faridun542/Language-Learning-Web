document.getElementById('generate-btn').addEventListener('click', async () => {
  const topic = document.getElementById('topic').value;
  const resultDiv = document.getElementById('result');
  
  if (!topic) {
    resultDiv.textContent = "Введите тему!";
    return;
  }

  resultDiv.textContent = "Генерация...";
  
  try {
    // Замените YOUR_API_KEY на ваш ключ OpenAI
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer YOUR_API_KEY"
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{
          role: "user",
          content: `Напиши учебный текст на английском (уровень B1) о ${topic}. 
                    Добавь перевод на русский и 5 новых слов с примерами.`
        }]
      })
    });
    
    const data = await response.json();
    resultDiv.textContent = data.choices[0].message.content;
  } catch (error) {
    resultDiv.textContent = "Ошибка: " + error.message;
  }
});
