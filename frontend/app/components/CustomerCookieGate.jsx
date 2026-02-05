"use client";

import { useEffect } from "react";
import { getCookie, setCookie } from "@/app/utils/cookies";

const CUSTOMER_COOKIE = "customerId";

async function safeJson(response) {
  const contentType = response.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    return response.json();
  }
  return null;
}

async function createCustomer() {
  const response = await fetch("/api/customers", {
    method: "POST",
    cache: "no-store",
  });

  if (!response.ok) {
    return null;
  }

  return safeJson(response);
}

async function validateCustomer(customerId) {
  const response = await fetch(`/api/customers/validate/${customerId}`, {
    method: "POST",
    cache: "no-store",
  });

  if (!response.ok) {
    return null;
  }

  return safeJson(response);
}

export default function CustomerCookieGate() {
  useEffect(() => {
    let cancelled = false;

    const ensureCustomerId = async () => {
      try {
        const existing = getCookie(CUSTOMER_COOKIE);
        if (!existing) {
          const created = await createCustomer();
          if (!cancelled && created?.customerId) {
            setCookie(CUSTOMER_COOKIE, created.customerId);
          }
          return;
        }

        const validated = await validateCustomer(existing);
        if (!cancelled && validated?.customerId) {
          if (String(validated.customerId) !== String(existing)) {
            setCookie(CUSTOMER_COOKIE, validated.customerId);
          }
        }
      } catch {
        // No-op: leave existing cookie as-is on transient failures.
      }
    };

    ensureCustomerId();
    return () => {
      cancelled = true;
    };
  }, []);

  return null;
}
