from flask import Flask, jsonify
import time

app = Flask(__name__)
start_time = None
elapsed_time = 0

@app.route('/start_timer', methods=['GET'])
def start_timer():
    global start_time
    if start_time is None:
        start_time = time.time()
    return "Timer started", 200

@app.route('/stop_timer', methods=['GET'])
def stop_timer():
    global start_time, elapsed_time
    if start_time is not None:
        elapsed_time += time.time() - start_time
        start_time = None
    return "Timer stopped", 200

@app.route('/get_time', methods=['GET'])
def get_time():
    global start_time, elapsed_time
    current_time = elapsed_time
    if start_time is not None:
        current_time += time.time() - start_time
    return jsonify({"elapsed_time": current_time}), 200

if __name__ == "__main__":
    app.run(port=5000)
