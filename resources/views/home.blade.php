<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Student Form</title>
    <link rel="stylesheet" href="{{ asset('css/app.css') }}">
</head>
<body class="p-6">

    <h1 class="text-2xl mb-4">Student Registration</h1>

    @if (session('success'))
        <div style="color: green; margin-bottom: 10px;">
            {{ session('success') }}
        </div>
    @endif

    <form action="{{ url('/students') }}" method="POST" style="display:flex;flex-direction:column;gap:10px;max-width:300px;">
        @csrf

        <label>
            Name:
            <input type="text" name="name" required>
        </label>

        <label>
            Age:
            <input type="number" name="age" required>
        </label>

        <label>
            Email:
            <input type="email" name="email" required>
        </label>

        <label>
            Gender:
            <select name="gender" required>
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
            </select>
        </label>

        <button type="submit">Submit</button>
    </form>

</body>
</html>
