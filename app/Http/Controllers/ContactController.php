<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    // Get all contacts
    public function index(Request $request)
    {
        $perPage = $request->get('per_page', 10);
        $contacts = Contact::latest()->paginate($perPage);

        return response()->json([
            'data' => $contacts->items(),
            'pagination' => [
                'total' => $contacts->total(),
                'per_page' => $contacts->perPage(),
                'current_page' => $contacts->currentPage(),
                'last_page' => $contacts->lastPage(),
            ],
        ]);
    }

    // Store new contact
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'    => 'required|string|max:255',
            'email'   => 'required|email|max:255',
            'subject' => 'required|string|max:255',
            'message' => 'required|string',
        ]);

        $contact = Contact::create($validated);

        return response()->json([
            'message' => 'Contact created successfully!',
            'data'    => $contact,
        ], 201);
    }

    // Update contact
    public function update(Request $request, Contact $contact)
    {
        $validated = $request->validate([
            'name'    => 'required|string|max:255',
            'email'   => 'required|email|max:255',
            'subject' => 'required|string|max:255',
            'message' => 'required|string',
        ]);

        $contact->update($validated);

        return response()->json([
            'message' => 'Contact updated successfully!',
            'data'    => $contact,
        ]);
    }

    // Delete contact (actually removes from DB)
    public function destroy(Contact $contact)
    {
        $contact->delete();

        return response()->json(['message' => 'Contact deleted successfully']);
    }
}
