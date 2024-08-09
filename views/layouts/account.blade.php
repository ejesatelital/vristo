<!DOCTYPE html>
<html>
<head lang="{{ LaravelLocalization::setLocale() }}">
    <meta charset="UTF-8">
    @section('meta')
        <meta name="description" content="@setting('core::site-description')"/>
    @show
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>@section('title')@setting('core::site-name')@show</title>
    @foreach($alternate as $alternateLocale=>$alternateSlug)
        <link rel="alternate" hreflang="{{$alternateLocale}}" href="{{url($alternateLocale.'/'.$alternateSlug)}}">
    @endforeach
    <link rel="canonical" href="{{url()->current()}}"/>
    <link rel="shortcut icon" href="{{ Theme::url('favicon.ico') }}">
    <link href="https://fonts.googleapis.com/css?family=Nunito:400,600,700" rel="stylesheet">
    @vite(['resources/js/src/main.ts'])
    @stack('css-stack')
</head>
<body>
<noscript>
    <strong>We're sorry but Vristo doesn't work properly without JavaScript enabled. Please enable it to continue.</strong>
</noscript>

<div id="app"></div>

 @stack('js-stack')
</body>
</html>
{{-- <!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>
        @section('title')
            {{ Setting::get('core::site-name') }}
        @show
    </title>
    <meta content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' name='viewport'>
    <link rel="shortcut icon" href="{{ asset('themes/adminlte/favicon.ico') }}">
    <link rel="stylesheet" href="{{ asset('themes/adminlte/vendor/bootstrap/dist/css/bootstrap.min.css') }}"/>
    <link rel="stylesheet" href="{{ asset('themes/adminlte/vendor/font-awesome/css/font-awesome.min.css') }}"/>
    <link rel="stylesheet" href="{{ asset('themes/adminlte/css/vendor/ionicons.min.css') }}"/>
    <link rel="stylesheet" href="{{ asset('themes/adminlte/css/vendor/alertify/alertify.core.css') }}"/>
    <link rel="stylesheet" href="{{ asset('themes/adminlte/vendor/admin-lte/dist/css/AdminLTE.min.css') }}"/>
    <link rel="stylesheet" href="{{ asset('themes/adminlte/vendor/admin-lte/plugins/iCheck/square/blue.css') }}"/>

    <script src="{{ asset('themes/adminlte/vendor/jquery/jquery.min.js') }}"></script>

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
    <script src="https://oss.maxcdn.com/libs/respond.js/1.3.0/respond.min.js"></script>
    <![endif]-->
</head>
<body class="hold-transition login-page">

<div class="login-box">
    @yield('content')
</div>

<!-- Bootstrap -->
<script src="{{ asset('themes/adminlte/vendor/bootstrap/dist/js/bootstrap.min.js') }}"></script>
<script src="{{ asset('themes/adminlte/vendor/iCheck/icheck.min.js') }}"></script>
<script src="{{ asset('themes/adminlte/js/vendor/alertify/alertify.js') }}"></script>
<script>
    $(function () {
        $('input').iCheck({
            checkboxClass: 'icheckbox_square-blue',
            radioClass: 'iradio_square-blue',
            increaseArea: '20%' // optional
        });
    });
</script>
</body>
</html> --}}
