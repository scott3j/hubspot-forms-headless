"use client";

import { getHubspotForm } from "@/lib/actions/hubspot-actions";
import { useEffect, useState } from "react";

interface HubspotFormProps {
  formId: string;
}

interface FormData {
  id: string;
  name: string;
  formType: string;
  createdAt: string;
  updatedAt: string;
  archived: boolean;
  fieldGroups: any[];
  configuration: any;
  displayOptions: any;
  legalConsentOptions: any;
}

export function HubspotFormJson({ formId }: HubspotFormProps) {
  const [form, setForm] = useState<FormData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchForm() {
      try {
        const result = await getHubspotForm(formId);
        if (result.success && result.data) {
          setForm(result.data);
        } else {
          setError(result.error || "Failed to fetch form");
        }
      } catch (err) {
        setError("Failed to fetch form");
      } finally {
        setLoading(false);
      }
    }

    fetchForm();
  }, [formId]);

  if (loading) {
    return <div className="w-full p-4">Loading form...</div>;
  }

  if (error) {
    return <div className="w-full p-4">Error: {error}</div>;
  }

  if (!form) {
    return <div className="w-full p-4">No form found</div>;
  }

  return (
    <div className="w-full p-4 min-w-0 max-w-full">
      <h2 className="text-xl font-semibold mb-4 truncate">{form.name}</h2>
      <div className="p-2 rounded-lg overflow-x-auto">
        <pre className="whitespace-pre-wrap break-words text-xs font-mono min-w-0 max-w-full overflow-y-auto">
          {JSON.stringify(form, null, 2)}
        </pre>
      </div>
    </div>
  );
}
