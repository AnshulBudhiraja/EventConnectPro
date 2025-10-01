
import React, { useEffect } from 'react';
import { Html5Qrcode, QrcodeErrorCallback, QrcodeSuccessCallback } from 'html5-qrcode';

interface QRScannerProps {
  onScanSuccess: (decodedText: string) => void;
  onError: (errorMessage: string) => void;
}

const QRScanner: React.FC<QRScannerProps> = ({ onScanSuccess, onError }) => {
  useEffect(() => {
    const qrboxFunction = (viewfinderWidth: number, viewfinderHeight: number) => {
      const minEdge = Math.min(viewfinderWidth, viewfinderHeight);
      const qrboxSize = Math.floor(minEdge * 0.8);
      return {
        width: qrboxSize,
        height: qrboxSize,
      };
    };

    const html5QrCode = new Html5Qrcode('qr-reader');

    const successCallback: QrcodeSuccessCallback = (decodedText, decodedResult) => {
      onScanSuccess(decodedText);
      // It's important to stop the scanner once a QR code is successfully scanned.
      html5QrCode.stop().catch(err => console.error("Failed to stop scanner after success", err));
    };

    const errorCallback: QrcodeErrorCallback = (errorMessage) => {
      // This callback is called frequently, we can ignore most errors.
      // console.warn(`QR Code no longer in front of camera.`);
    };
    
    const startScanner = async () => {
      try {
        await html5QrCode.start(
          { facingMode: 'environment' },
          {
            fps: 10,
            qrbox: qrboxFunction,
          },
          successCallback,
          errorCallback
        );
      } catch (err) {
        console.error("Error starting QR scanner", err);
        let message = 'Could not start camera.';
        if (err instanceof Error) {
            message = err.message;
        }
        onError(message);
      }
    };

    startScanner();

    return () => {
      if (html5QrCode && html5QrCode.isScanning) {
        html5QrCode.stop().catch(err => {
            // It might fail if the component is unmounted quickly, which is okay.
            console.log("Scanner stopped.");
        });
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-xl font-bold mb-4">Scan Attendee's QR Code</h2>
      <div id="qr-reader" className="w-full h-64 border-2 border-dashed border-gray-light rounded-lg overflow-hidden"></div>
      <p className="mt-4 text-sm text-gray-400">Position the QR code inside the frame.</p>
    </div>
  );
};

export default QRScanner;
