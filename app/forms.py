from flask_wtf import FlaskForm
from wtforms.fields import EmailField, URLField, PasswordField, SubmitField, StringField, RadioField, TextAreaField, BooleanField, IntegerField, DecimalField
from wtforms.validators import DataRequired
from flask_pagedown.fields import PageDownField

class SignupForm(FlaskForm):
    name = StringField('ชื่อ Name', validators=[DataRequired()])
    email = EmailField('อีเมล Email', validators=[DataRequired()])
    password = PasswordField('สร้างรหัสผ่าน Create Password', validators=[DataRequired()])
    password_check = PasswordField('ยืนยันรหัสผ่าน Confirm password', validators=[DataRequired()])
    submit = SubmitField('Create an account')

class LoginForm(FlaskForm):
    email = EmailField('Email', validators=[DataRequired()])
    password = PasswordField('Password', validators=[DataRequired()])
    submit = SubmitField('Login')

class ForgetForm(FlaskForm):
    email = EmailField('อีเมล Email', validators=[DataRequired()])
    submit = SubmitField('ขอรหัสผ่านใหม่ Request new password')

class PasswordChangeForm(FlaskForm):
    password_current = PasswordField('รหัสผ่านปัจจุบัน Current password', validators=[DataRequired()])
    password_new = PasswordField('รหัสผ่านใหม่ New password', validators=[DataRequired()])
    password_new_check = PasswordField('ยืนยันรหัสผ่านใหม่ Confirm new password', validators=[DataRequired()])
    submit = SubmitField('เปลี่ยนรหัสผ่าน Change password')

class PasswordResetForm(FlaskForm):
    password_reset_id = StringField('Password reset ID', validators=[DataRequired()])
    password_new = PasswordField('รหัสผ่านใหม่ New password', validators=[DataRequired()])
    password_new_check = PasswordField('ยืนยันรหัสผ่านใหม่ Confirm new password', validators=[DataRequired()])
    submit = SubmitField('เปลี่ยนรหัสผ่าน Change password')

class ProjectForm(FlaskForm):
    submit = SubmitField('ส่งข้อมูล Submit')

class StakeholderForm(FlaskForm):
    submit = SubmitField('ส่งข้อมูล Submit')

class ActivityForm(FlaskForm):
    submit = SubmitField('ส่งข้อมูล Submit')

class OutputForm(FlaskForm):
    submit = SubmitField('ส่งข้อมูล Submit')

class OutcomeForm(FlaskForm):
    submit = SubmitField('ส่งข้อมูล Submit')