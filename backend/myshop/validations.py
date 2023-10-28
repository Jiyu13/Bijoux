from django.core.exceptions import ValidationError
from django.contrib.auth import get_user_model
UserModel = get_user_model()


def custom_validation(data):

    errors = {'errors': {}}

    email = data['email'].strip()
    first_name = data['first_name'].strip()
    last_name = data['last_name'].strip()
    password = data['password'].strip()

    # ==================================================================
    if not first_name:
        errors['errors']['first_name'] = 'First name is required'
    if not last_name:
        errors['errors']['last_name'] = 'Last name is required'
    # ==================================================================
    if not email:
        errors['errors']['email'] = 'Email is required.'
    if UserModel.objects.filter(email=email).exists():
        errors['errors']['email'] = 'Email is already taken.'
    # ==================================================================
    if not password or len(password) < 8:
        errors['errors']['length'] = 'Password must be at least 8 characters long.'
    if not any(char.isdigit() for char in password):
        errors['errors']['numeric'] = 'Password must contain at least one numeric character.'
    if not any(char.isalpha() for char in password):
        errors['errors']['alphabetic'] = 'password must contain at least one alphabetic character.'

    if errors['errors']:
        return errors
    else:
        return data


def validate_email(data):
    email = data['email'].strip()
    if not email:
        raise ValidationError('an email is needed')
    return True


# def validate_username(data):
#     username = data['username'].strip()
#     if not username:
#         raise ValidationError('choose another username')
#     return True


def validate_password(data):
    password = data['password'].strip()
    if not password:
        raise ValidationError('a password is needed')
    # if
    return True
