"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getHubspotForm } from "@/lib/actions/hubspot-actions";
import { submitHubspotForm } from "@/lib/actions/submit-hubspot-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@workspace/ui/components/form";
import { Input } from "@workspace/ui/components/input";
import { Button } from "@workspace/ui/components/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select";

interface HubspotFormProps {
  formId: string;
  onSubmissionData?: (data: {
    formId: string;
    fields: Record<string, string>;
    pageUrl?: string;
    pageName?: string;
  }) => void;
  onSubmissionResponse?: (response: {
    success: boolean;
    data?: any;
    error?: string;
  }) => void;
}

interface FormValues {
  [key: string]: string;
}

export function HubspotForm({
  formId,
  onSubmissionData,
  onSubmissionResponse,
}: HubspotFormProps) {
  const [formData, setFormData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize form with default values
  const defaultValues: FormValues = {};
  const form = useForm<FormValues>({
    defaultValues,
  });

  useEffect(() => {
    async function fetchForm() {
      try {
        const result = await getHubspotForm(formId);
        if (result.success && result.data) {
          setFormData(result.data);
          // Set initial form values
          const initialValues: FormValues = {};
          result.data.fieldGroups.forEach((group: any) => {
            group.fields.forEach((field: any) => {
              initialValues[field.name] = field.defaultValue || "";
            });
          });
          form.reset(initialValues);
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
  }, [formId, form]);

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    // Notify parent component about submission data
    onSubmissionData?.({
      formId,
      fields: data,
      pageUrl: window.location.href,
      pageName: document.title,
    });

    try {
      const result = await submitHubspotForm({
        formId,
        fields: data,
        pageUrl: window.location.href,
        pageName: document.title,
      });

      // Notify parent component about submission response
      onSubmissionResponse?.(result);

      if (result.success) {
        setSubmitSuccess(true);
        form.reset();
      } else {
        setSubmitError(result.error || "Failed to submit form");
      }
    } catch (err) {
      const errorResponse = {
        success: false,
        error: "Failed to submit form",
      };
      onSubmissionResponse?.(errorResponse);
      setSubmitError("Failed to submit form");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="w-full max-w-2xl p-4 min-h-[400px] flex items-center justify-center">
        <div>Loading form...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-2xl p-4 min-h-[400px] flex items-center justify-center">
        <div>Error: {error}</div>
      </div>
    );
  }

  if (!formData) {
    return (
      <div className="w-full max-w-2xl p-4 min-h-[400px] flex items-center justify-center">
        <div>No form found</div>
      </div>
    );
  }

  const renderField = (field: any) => {
    // Check if field is a select/dropdown
    const isSelect = field.type === "select" || field.options?.length > 0;

    if (isSelect) {
      return (
        <Select
          onValueChange={(value) => form.setValue(field.name, value)}
          defaultValue={field.defaultValue}
        >
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder={field.label} />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            {field.options?.map((option: any) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );
    }

    return (
      <FormControl>
        <Input
          type={field.type || "text"}
          placeholder={field.placeholder}
          {...form.register(field.name)}
        />
      </FormControl>
    );
  };

  return (
    <div className="w-full max-w-2xl p-4 min-h-[400px]">
      <h2 className="text-xl font-semibold mb-4">{formData.name}</h2>
      {submitSuccess && (
        <div className="mb-4 p-4 bg-green-50 text-green-700 rounded-md">
          Form submitted successfully!
        </div>
      )}
      {submitError && (
        <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-md">
          {submitError}
        </div>
      )}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {formData.fieldGroups.map((group: any, groupIndex: number) => (
            <div key={groupIndex} className="space-y-4">
              {group.fields.map((field: any) => (
                <FormField
                  key={field.name}
                  control={form.control}
                  name={field.name}
                  rules={{
                    required: field.required
                      ? `${field.label} is required`
                      : false,
                  }}
                  render={({ field: formField }) => (
                    <FormItem>
                      <FormLabel>{field.label}</FormLabel>
                      {renderField(field)}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
            </div>
          ))}
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
