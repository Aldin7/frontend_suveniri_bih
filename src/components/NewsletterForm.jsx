import React, { useState } from "react";
import { useTranslation } from 'react-i18next';
import '../../i18n';

function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const { t } = useTranslation();
  const handleSubscribe = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      setMessage(data.message);
    } catch (error) {
      setMessage("Greška pri prijavi.");
    }
  };

  return (
    <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
      <input
        type="email"
        placeholder={t('enterEmail')}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border px-4 py-2 rounded"
        required
      />
      <button type="submit" className="bg-black text-white px-4 py-2 rounded">
        {t('subscribe')}
      </button>
      {message && <p className="text-sm text-gray-600">{message}</p>}
    </form>
  );
}

export default NewsletterForm;