<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    // List contacts: active or archived
    public function index(Request $request)
    {
        $archived = $request->query('archived', 0); // 0 = active, 1 = archived

        $query = Contact::query();

        if ($archived == 1) {
            $query->where('is_archived', true);
        } else {
            $query->where('is_archived', false);
        }

        return response()->json($query->get());
    }

    // Store a new contact
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'subject' => 'required|string|max:255',
            'message' => 'required|string',
        ]);

        $contact = Contact::create($data);

        return response()->json(['data' => $contact]);
    }

    // Update existing contact
    public function update(Request $request, $id)
    {
        $contact = Contact::findOrFail($id);

        $data = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'subject' => 'required|string|max:255',
            'message' => 'required|string',
        ]);

        $contact->update($data);

        return response()->json(['data' => $contact]);
    }

    // Archive contact (Active tab → Archived)
    public function archive($id)
    {
        $contact = Contact::findOrFail($id);
        $contact->update(['is_archived' => true]);

        return response()->json(['message' => 'Contact archived']);
    }

    // Restore contact (Archived tab → Active)
    public function restore($id)
    {
        $contact = Contact::findOrFail($id);
        $contact->update(['is_archived' => false]);

        return response()->json(['message' => 'Contact restored']);
    }

    // Soft delete (Archived tab → Permanently deleted in UI but kept in DB with deleted_at)
    public function destroy($id)
    {
        $contact = Contact::findOrFail($id);
        $contact->delete(); // Soft delete; fills deleted_at

        return response()->json(['message' => 'Contact soft-deleted']);
    }

    // Optional: Show soft deleted items
    public function trashed()
    {
        return response()->json(Contact::onlyTrashed()->get());
    }
}
