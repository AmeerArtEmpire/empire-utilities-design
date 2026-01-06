import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { QRCodeSVG, QRCodeCanvas } from "qrcode.react";
import { ArrowLeft, Download, Mail, Phone, Wifi, Link as LinkIcon, Type } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

type QRType = "url" | "text" | "email" | "phone" | "wifi";

const QrCodeGenerator = () => {
  const { toast } = useToast();
  const canvasRef = useRef<HTMLDivElement>(null);
  
  const [qrType, setQrType] = useState<QRType>("url");
  const [url, setUrl] = useState("https://example.com");
  const [text, setText] = useState("");
  const [email, setEmail] = useState("");
  const [emailSubject, setEmailSubject] = useState("");
  const [phone, setPhone] = useState("");
  const [wifiSsid, setWifiSsid] = useState("");
  const [wifiPassword, setWifiPassword] = useState("");
  
  const [fgColor, setFgColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#FFFFFF");
  const [size, setSize] = useState([256]);

  const getQRValue = (): string => {
    switch (qrType) {
      case "url": return url;
      case "text": return text;
      case "email": return `mailto:${email}${emailSubject ? `?subject=${encodeURIComponent(emailSubject)}` : ""}`;
      case "phone": return `tel:${phone}`;
      case "wifi": return `WIFI:T:WPA;S:${wifiSsid};P:${wifiPassword};;`;
      default: return "";
    }
  };

  const downloadQR = (format: "png" | "svg") => {
    const qrValue = getQRValue();
    if (!qrValue) {
      toast({ title: "Error", description: "Please enter content for the QR code", variant: "destructive" });
      return;
    }

    if (format === "png") {
      const canvas = canvasRef.current?.querySelector("canvas");
      if (canvas) {
        const link = document.createElement("a");
        link.download = "qrcode.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
        toast({ title: "Downloaded!", description: "QR code saved as PNG" });
      }
    } else {
      const svg = canvasRef.current?.querySelector("svg");
      if (svg) {
        const svgData = new XMLSerializer().serializeToString(svg);
        const blob = new Blob([svgData], { type: "image/svg+xml" });
        const link = document.createElement("a");
        link.download = "qrcode.svg";
        link.href = URL.createObjectURL(blob);
        link.click();
        toast({ title: "Downloaded!", description: "QR code saved as SVG" });
      }
    }
  };

  const qrValue = getQRValue();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/tools">
              <ArrowLeft className="w-5 h-5" />
            </Link>
          </Button>
          <h1 className="text-xl font-bold">QR Code Generator</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <Tabs value={qrType} onValueChange={(v) => setQrType(v as QRType)}>
              <TabsList className="grid grid-cols-5 w-full">
                <TabsTrigger value="url" className="flex items-center gap-1">
                  <LinkIcon className="w-4 h-4" />
                  <span className="hidden sm:inline">URL</span>
                </TabsTrigger>
                <TabsTrigger value="text" className="flex items-center gap-1">
                  <Type className="w-4 h-4" />
                  <span className="hidden sm:inline">Text</span>
                </TabsTrigger>
                <TabsTrigger value="email" className="flex items-center gap-1">
                  <Mail className="w-4 h-4" />
                  <span className="hidden sm:inline">Email</span>
                </TabsTrigger>
                <TabsTrigger value="phone" className="flex items-center gap-1">
                  <Phone className="w-4 h-4" />
                  <span className="hidden sm:inline">Phone</span>
                </TabsTrigger>
                <TabsTrigger value="wifi" className="flex items-center gap-1">
                  <Wifi className="w-4 h-4" />
                  <span className="hidden sm:inline">WiFi</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="url" className="space-y-4">
                <div>
                  <Label>URL</Label>
                  <Input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://example.com" />
                </div>
              </TabsContent>

              <TabsContent value="text" className="space-y-4">
                <div>
                  <Label>Text</Label>
                  <Input value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter your text" />
                </div>
              </TabsContent>

              <TabsContent value="email" className="space-y-4">
                <div>
                  <Label>Email Address</Label>
                  <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email@example.com" />
                </div>
                <div>
                  <Label>Subject (optional)</Label>
                  <Input value={emailSubject} onChange={(e) => setEmailSubject(e.target.value)} placeholder="Email subject" />
                </div>
              </TabsContent>

              <TabsContent value="phone" className="space-y-4">
                <div>
                  <Label>Phone Number</Label>
                  <Input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+1234567890" />
                </div>
              </TabsContent>

              <TabsContent value="wifi" className="space-y-4">
                <div>
                  <Label>Network Name (SSID)</Label>
                  <Input value={wifiSsid} onChange={(e) => setWifiSsid(e.target.value)} placeholder="My WiFi Network" />
                </div>
                <div>
                  <Label>Password</Label>
                  <Input type="password" value={wifiPassword} onChange={(e) => setWifiPassword(e.target.value)} placeholder="WiFi password" />
                </div>
              </TabsContent>
            </Tabs>

            {/* Customization */}
            <div className="space-y-4 p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold">Customize</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Foreground Color</Label>
                  <div className="flex gap-2 mt-1">
                    <input type="color" value={fgColor} onChange={(e) => setFgColor(e.target.value)} className="w-10 h-10 rounded cursor-pointer border-0" />
                    <Input value={fgColor} onChange={(e) => setFgColor(e.target.value)} className="font-mono" />
                  </div>
                </div>
                <div>
                  <Label>Background Color</Label>
                  <div className="flex gap-2 mt-1">
                    <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="w-10 h-10 rounded cursor-pointer border-0" />
                    <Input value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="font-mono" />
                  </div>
                </div>
              </div>

              <div>
                <Label>Size: {size[0]}px</Label>
                <Slider value={size} onValueChange={setSize} min={128} max={512} step={32} className="mt-2" />
              </div>
            </div>
          </div>

          {/* Preview Section */}
          <div className="space-y-6">
            <div className="p-8 rounded-xl border border-border bg-card flex flex-col items-center justify-center min-h-[400px]">
              {qrValue ? (
                <div ref={canvasRef} className="space-y-4">
                  <div className="hidden">
                    <QRCodeCanvas value={qrValue} size={size[0]} fgColor={fgColor} bgColor={bgColor} level="H" />
                  </div>
                  <QRCodeSVG value={qrValue} size={size[0]} fgColor={fgColor} bgColor={bgColor} level="H" />
                </div>
              ) : (
                <p className="text-muted-foreground">Enter content to generate QR code</p>
              )}
            </div>

            {qrValue && (
              <div className="flex gap-4">
                <Button onClick={() => downloadQR("png")} className="flex-1">
                  <Download className="w-4 h-4 mr-2" />
                  Download PNG
                </Button>
                <Button onClick={() => downloadQR("svg")} variant="outline" className="flex-1">
                  <Download className="w-4 h-4 mr-2" />
                  Download SVG
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default QrCodeGenerator;
