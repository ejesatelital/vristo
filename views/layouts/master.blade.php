<!DOCTYPE html>
<html>
<head lang="{{LaravelLocalization::getCurrentLocale() }}">
    <meta charset="UTF-8">
    @section('meta')
        <meta name="description" content="@setting('core::site-description')"/>
    @show
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="user-api-token" content="{{ $currentUser?$currentUser->getFirstApiKey():'' }}">
    <title>@section('title')@setting('core::site-name')@show</title>
    <link rel="canonical" href="{{url()->current()}}"/>
    <link rel="shortcut icon" href="{{Theme::url('favicon.ico') }}">
    <link href="https://fonts.googleapis.com/css?family=Nunito:400,600,700" rel="stylesheet">
    @vite(['resources/js/src/main.ts'])
    @stack('css-stack')
</head>
<body>
@yield('content')

@yield('scripts')

<?php if (Setting::has('core::analytics-script')): ?>
{!! Setting::get('core::analytics-script') !!}
<?php endif; ?>
@stack('js-stack')
</body>
</html>

