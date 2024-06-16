# Generated by Django 5.0.6 on 2024-06-16 15:56

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='TarotCard',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('card_num', models.IntegerField(unique=True)),
                ('card_name', models.CharField(max_length=100, unique=True)),
                ('card_url', models.CharField(max_length=255)),
                ('is_major', models.BooleanField(default=True)),
                ('distinguish', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='TarotCardForwardMeaning',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('card_forward_mean', models.CharField(max_length=255)),
                ('tarotcard', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='tarotcard.tarotcard')),
            ],
        ),
        migrations.CreateModel(
            name='TarotCardReverseMeaning',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('card_reverse_mean', models.CharField(max_length=255)),
                ('tarotcard', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='tarotcard.tarotcard')),
            ],
        ),
        migrations.CreateModel(
            name='TarotMeanExplain',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('explain', models.TextField()),
                ('tarotcard', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='tarotcard.tarotcard')),
            ],
        ),
        migrations.CreateModel(
            name='TarotNumerologyMean',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('numerology_mean', models.CharField(max_length=255)),
                ('tarotcard', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='tarotcard.tarotcard')),
            ],
        ),
        migrations.CreateModel(
            name='TarotPictureMean',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('picture_mean', models.CharField(max_length=255)),
                ('tarotcard', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='tarotcard.tarotcard')),
            ],
        ),
        migrations.CreateModel(
            name='TarotResult',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('greeting', models.TextField()),
                ('past', models.TextField()),
                ('present', models.TextField()),
                ('future', models.TextField()),
                ('advice', models.TextField()),
                ('conclusion', models.TextField()),
                ('selected_cards', models.JSONField()),
                ('selected_cards_name', models.JSONField()),
                ('subject', models.CharField(max_length=255)),
                ('consulValue', models.CharField(max_length=255)),
                ('save_date', models.DateTimeField(auto_now_add=True)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
