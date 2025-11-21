import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react"; 

export default function LoadingCard() {
  return (
    <Card className="p-4 flex items-center justify-center space-x-2">
      <Loader2 className="animate-spin w-6 h-6 text-gray-500" />
      <CardContent>
        <p className="text-gray-500 font-medium">Carregando...</p>
      </CardContent>
    </Card>
  );
}
