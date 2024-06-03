# Generated by Django 4.1.13 on 2024-06-03 23:23

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='TarotCard',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('card_num', models.IntegerField(unique=True)),
                ('card_name', models.CharField(max_length=100, unique=True)),
                ('card_url', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='TarotPictureMean',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('picture_mean', models.CharField(max_length=255)),
                ('tarotcard', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='tarotcards.tarotcard')),
            ],
        ),
        migrations.CreateModel(
            name='TarotNumerologyMean',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('numerology_mean', models.CharField(max_length=255)),
                ('tarotcard', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='tarotcards.tarotcard')),
            ],
        ),
        migrations.CreateModel(
            name='TarotMeanExplain',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('explain', models.TextField()),
                ('tarotcard', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='tarotcards.tarotcard')),
            ],
        ),
        migrations.CreateModel(
            name='TarotCardReverseMeaning',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('card_reverse_mean', models.CharField(max_length=255)),
                ('tarotcard', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='tarotcards.tarotcard')),
            ],
        ),
        migrations.CreateModel(
            name='TarotCardForwardMeaning',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('card_forward_mean', models.CharField(max_length=255)),
                ('tarotcard', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='tarotcards.tarotcard')),
            ],
        ),
    ]
