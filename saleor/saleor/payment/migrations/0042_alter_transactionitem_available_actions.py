# Generated by Django 3.2.18 on 2023-03-15 07:36

import django.contrib.postgres.fields
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("payment", "0041_add_calculation_transaction_events"),
    ]

    operations = [
        migrations.AlterField(
            model_name="transactionitem",
            name="available_actions",
            field=django.contrib.postgres.fields.ArrayField(
                base_field=models.CharField(
                    choices=[
                        ("charge", "Charge payment"),
                        ("refund", "Refund payment"),
                        ("void", "Void payment"),
                        ("cancel", "Cancel payment"),
                    ],
                    max_length=128,
                ),
                default=list,
                size=None,
            ),
        ),
    ]
