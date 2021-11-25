"""Add img_url column to Project table

Revision ID: 1dcb912d6836
Revises: c50fa84f7100
Create Date: 2021-11-22 15:15:27.054109

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '1dcb912d6836'
down_revision = 'c50fa84f7100'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('project', sa.Column('img_url', sa.String(length=10000), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('project', 'img_url')
    # ### end Alembic commands ###
