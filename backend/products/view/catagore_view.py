from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from products.model.Category_model import Category
from products.serializer.catagore_serializer import CategoryDetailSerializer


class CategoryListAPIView(APIView):

    def get(self, request):

        categories = Category.objects.filter(
            is_active=True
        ).order_by("id")

        data = []

        for category in categories:
            data.append({
                "id": category.id,
                "title": category.title,
                "slug": category.slug,
                "parent": category.parent_id,
            })

        return Response(
            data,
            status=status.HTTP_200_OK
        )


class CategoryDetailAPIView(APIView):

    def get(self, request, slug):

        try:
            category = Category.objects.get(
                slug=slug
            )

            if not category.is_active:
                print(
                    "توجه: این دسته بندی در ادمین غیرفعال است!"
                )

        except Category.DoesNotExist:

            return Response(
                {
                    "detail": (
                        f"کتگوری با اسلاگ "
                        f"'{slug}' اصلاً در دیتابیس وجود ندارد."
                    )
                },
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = CategoryDetailSerializer(
            category,
            context={
                "request": request
            }
        )

        return Response(
            serializer.data,
            status=status.HTTP_200_OK
        )