"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import jwt_required, get_jwt_identity, create_access_token, get_jwt_identity
import datetime
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash


api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

@api.route('/', methods=['GET'])
def hello():
    return jsonify({"status":"success","message":"Hello"})

@api.route('/register', methods=['POST'])
def user_register():
    username = request.json.get('username')
    email = request.json.get('email')
    password = request.json.get('password')

    if not username:
        return jsonify({'msg': 'Username is required'}),400
    
    if not password:
        return jsonify({'msg': 'Password is required'}),400
    
    usernameFound = User.query.filter_by(username=username).first()
    if usernameFound:
        return jsonify({'msg': 'Username is already used!'}),400
    
    emailFound = User.query.filter_by(email=email).first()
    if emailFound:
        return jsonify({'msg': 'There is an existing account with this email'}),400
    
    user = User()
    user.username = username
    user.email = email
    user.password= generate_password_hash(password)
    user.save()

    if user:
        return jsonify({'status': 'success', 'message':'User successfully created'}),200
    
    return jsonify ({"status":"error", "message":"Register Error, please try later"}),200


@api.route('/login', methods=['POST'])
def user_login():
    username = request.json.get('username')
    password = request.json.get('password')

    if not username:
        return jsonify({'msg':'Username is required'}),400
    
    if not password:
        return jsonify({'msg':'Password is required'}),400
    
    user = User.query.filter_by(username=username).first()

    if not user:
        return jsonify ({'msg':'Invalid credentials'}), 401
    
    if not check_password_hash(user.password, password):
        return jsonify ({'msg':'Invalid credentials'}), 401
    
    expire = datetime.timedelta(hours=1) # Tiempo de duracion del TOKEN
    token= create_access_token(identity=str(user.id), expires_delta=expire)
    
    data={
        "token": token,
        "user": user.serialize()
    }

    return jsonify(data), 200

    
@api.route('/profile', methods=['GET'])
@jwt_required()
def profile():
    
    id=get_jwt_identity();
    user = User.query.get(id) # .get Ya que el Id es la clave primaria de lo contrario no funcionaria para otra campo usa .filter_by(...).first().
    
    if not user:
        return jsonify({"msg":"User not found"}),404
    
    return jsonify(user.serialize()),200


