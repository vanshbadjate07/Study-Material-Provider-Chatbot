from flask import Flask, render_template, request, jsonify
import google.generativeai as ai

app = Flask(__name__)

API_KEY = 'YOUR API KEY'
ai.configure(api_key=API_KEY)
model = ai.GenerativeModel("gemini-pro")
chat = model.start_chat()

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/ask', methods=['POST'])
def ask():
    user_message = request.json.get('message')  
    if not user_message:
        return jsonify({'response': 'No message provided'}), 400  

    response = chat.send_message(user_message)  
    return jsonify({'response': response.text}) 

if __name__ == '__main__':
    app.run(debug=True)
