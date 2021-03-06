"""Add User, Project, Stakeholder, Activity tables

Revision ID: c50fa84f7100
Revises: 
Create Date: 2021-11-22 14:46:14.023460

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'c50fa84f7100'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('user',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=100), nullable=True),
    sa.Column('email', sa.String(length=100), nullable=True),
    sa.Column('password_hash', sa.String(length=200), nullable=True),
    sa.Column('role', sa.String(length=20), nullable=True),
    sa.Column('create_dt', sa.DateTime(), nullable=True),
    sa.Column('lastlogin_dt', sa.DateTime(), nullable=True),
    sa.Column('password_reset_id', sa.String(length=12), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('project',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('create_dt', sa.DateTime(), nullable=True),
    sa.Column('mod_user_id', sa.Integer(), nullable=True),
    sa.Column('mod_dt', sa.DateTime(), nullable=True),
    sa.Column('published', sa.Boolean(), nullable=True),
    sa.Column('json', sa.JSON(), nullable=True),
    sa.ForeignKeyConstraint(['mod_user_id'], ['user.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('stakeholder',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('project_id', sa.Integer(), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('create_dt', sa.DateTime(), nullable=True),
    sa.Column('mod_user_id', sa.Integer(), nullable=True),
    sa.Column('mod_dt', sa.DateTime(), nullable=True),
    sa.Column('published', sa.Boolean(), nullable=True),
    sa.Column('json', sa.JSON(), nullable=True),
    sa.ForeignKeyConstraint(['mod_user_id'], ['user.id'], ),
    sa.ForeignKeyConstraint(['project_id'], ['project.id'], ondelete='CASCADE'),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('activity',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('stakeholder_id', sa.Integer(), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('create_dt', sa.DateTime(), nullable=True),
    sa.Column('mod_user_id', sa.Integer(), nullable=True),
    sa.Column('mod_dt', sa.DateTime(), nullable=True),
    sa.Column('published', sa.Boolean(), nullable=True),
    sa.Column('json', sa.JSON(), nullable=True),
    sa.ForeignKeyConstraint(['mod_user_id'], ['user.id'], ),
    sa.ForeignKeyConstraint(['stakeholder_id'], ['stakeholder.id'], ondelete='CASCADE'),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('activity')
    op.drop_table('stakeholder')
    op.drop_table('project')
    op.drop_table('user')
    # ### end Alembic commands ###
