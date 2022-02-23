from flask import Flask, render_template, request

app = Flask('app')

@app.route('/')
@app.route('/')
def hello_world():
  return render_template(
    'index.html',
    user_id=request.headers['X-Replit-User-Id'],
    user_name=request.headers['X-Replit-User-Name']
  )
app.run(host='0.0.0.0', port=)