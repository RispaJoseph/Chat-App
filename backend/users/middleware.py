import urllib.parse
from django.contrib.auth.models import AnonymousUser
from rest_framework_simplejwt.tokens import UntypedToken
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.contrib.auth import get_user_model
from channels.db import database_sync_to_async


User = get_user_model()


class JWTAuthMiddleware:
    """Middleware that takes `token` from querystring and authenticates user for channels scope."""
    def __init__(self, inner):
        self.inner = inner


def __call__(self, scope):
    query_string = scope.get('query_string', b'').decode()
    qs = urllib.parse.parse_qs(query_string)
    token_list = qs.get('token') or qs.get('access')
    token = token_list[0] if token_list else None
    scope['user'] = AnonymousUser()
    if token:
        try:
            validated = UntypedToken(token)
            # get user id from token
            auth = JWTAuthentication()
            user_auth_tuple = auth.get_user(validated)
        except Exception:
            scope['user'] = AnonymousUser()
    else:
    # channels expects a sync scope; set user synchronously is fine if small
        from django.contrib.auth import get_user_model
        try:
            user = User.objects.get(pk=validated['user_id'])
            scope['user'] = user
        except Exception:
            scope['user'] = AnonymousUser()
            return self.inner(scope)