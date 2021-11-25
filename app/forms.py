from flask_wtf import FlaskForm
from wtforms.fields import EmailField, URLField, PasswordField, SubmitField, StringField, RadioField, TextAreaField, BooleanField, IntegerField, DecimalField
from wtforms.validators import DataRequired
from flask_pagedown.fields import PageDownField

class SignupForm(FlaskForm):
    name = StringField('ชื่อ: ', validators=[DataRequired()])
    email = EmailField('อีเมล: ', validators=[DataRequired()])
    password = PasswordField('รหัสผ่าน: ', validators=[DataRequired()])
    password_check = PasswordField('ยืนยันรหัสผ่าน: ', validators=[DataRequired()])
    submit = SubmitField('สมัครสมาชิก Sign-up')

class LoginForm(FlaskForm):
    email = EmailField('อีเมล: ', validators=[DataRequired()])
    password = PasswordField('รหัสผ่าน: ', validators=[DataRequired()])
    submit = SubmitField('ล็อกอิน Login')

class ForgetForm(FlaskForm):
    email = EmailField('อีเมล: ', validators=[DataRequired()])
    submit = SubmitField('ขอรหัสผ่านใหม่ Request new password')

class PasswordChangeForm(FlaskForm):
    password_current = PasswordField('รหัสผ่านปัจจุบัน: ', validators=[DataRequired()])
    password_new = PasswordField('รหัสผ่านใหม่: ', validators=[DataRequired()])
    password_new_check = PasswordField('ยืนยันรหัสผ่านใหม่: ', validators=[DataRequired()])
    submit = SubmitField('เปลี่ยนรหัสผ่าน Change password')

class PasswordResetForm(FlaskForm):
    password_reset_id = StringField('Password Reset ID: ', validators=[DataRequired()])
    password_new = PasswordField('รหัสผ่านใหม่: ', validators=[DataRequired()])
    password_new_check = PasswordField('ยืนยันรหัสผ่านใหม่: ', validators=[DataRequired()])
    submit = SubmitField('เปลี่ยนรหัสผ่าน Change password')

class ProjectForm(FlaskForm):
    submit = SubmitField('ส่งข้อมูล Submit')

class StakeholderForm(FlaskForm):
    submit = SubmitField('ส่งข้อมูล Submit')

class ActivityForm(FlaskForm):
    submit = SubmitField('ส่งข้อมูล Submit')