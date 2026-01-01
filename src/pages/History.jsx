import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Header } from "@/components/Header";
import { Leaf } from "lucide-react";

export default function History() {
  const { language } = useLanguage();
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const data =
      JSON.parse(localStorage.getItem("predictionHistory")) || [];
    setHistory(data);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header showBack />

      <main className="pt-[120px] pb-16 px-4 max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-10 pt-12">
          {language === "en" ? "Prediction History" : "পূর্বের ফলাফল"}
        </h1>

        {history.length === 0 ? (
          <p className="text-center text-gray-500">
            {language === "en"
              ? "No history found"
              : "কোনো ফলাফল পাওয়া যায়নি"}
          </p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {history.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl border shadow p-4 space-y-4"
              >
                <img
                  src={item.imageData}
                  alt="Crop"
                  className="w-full h-40 object-cover rounded-xl"
                />

                <div className="flex items-center gap-3">
                  <Leaf className="text-green-600" />
                  <div>
                    <p className="text-sm text-gray-500">
                      {language === "en" ? "Crop" : "ফসল"}
                    </p>
                    <p className="font-bold">
                      {item.crop}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="font-semibold text-red-600">
                    {item.diseaseInfo.name}
                  </p>
                  <p className="text-sm text-gray-600 line-clamp-3">
                    {item.diseaseInfo.description}
                  </p>
                </div>

                <p className="text-xs text-gray-400">
                  {new Date(item.createdAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
