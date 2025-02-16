# Generated by Django 3.1 on 2020-10-16 09:16

from django.apps import apps as registry
from django.db import migrations
from django.db.models.signals import post_migrate


def update_groups_with_manage_products_with_new_permission(apps, schema_editor):
    def on_migrations_complete(sender=None, **kwargs):
        try:
            apps = kwargs["apps"]
        except KeyError:
            # In test when we use use `@pytest.mark.django_db(transaction=True)`
            # pytest trigger additional post_migrate signal without `apps` in kwargs.
            return
        Group = apps.get_model("account", "Group")
        Permission = apps.get_model("permission", "Permission")
        ContentType = apps.get_model("contenttypes", "ContentType")

        ct, _ = ContentType.objects.get_or_create(
            app_label="product", model="producttype"
        )
        product_type_and_attribute_permission, _ = Permission.objects.get_or_create(
            codename="manage_product_types_and_attributes",
            content_type=ct,
            name="Manage product types and attributes.",
        )

        groups = Group.objects.filter(
            permissions__content_type__app_label="product",
            permissions__codename="manage_products",
        )
        for group in groups:
            group.permissions.add(product_type_and_attribute_permission)

    sender = registry.get_app_config("product")
    post_migrate.connect(on_migrations_complete, weak=False, sender=sender)


class Migration(migrations.Migration):
    dependencies = [
        ("product", "0128_update_publication_date"),
    ]

    operations = [
        migrations.AlterModelOptions(
            name="producttype",
            options={
                "ordering": ("slug",),
                "permissions": (
                    (
                        "manage_product_types_and_attributes",
                        "Manage product types and attributes.",
                    ),
                ),
            },
        ),
        migrations.RunPython(
            update_groups_with_manage_products_with_new_permission,
            migrations.RunPython.noop,
        ),
    ]
