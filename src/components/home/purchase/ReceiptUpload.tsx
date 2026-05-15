import {
  ImagePlus,
  Check
} from "lucide-react";

interface Props {
  receipt: File | null;
  setReceipt: (file: File | null) => void;
}

export default function ReceiptUpload({
  receipt,
  setReceipt
}: Props) {

  return (

    <div className="receipt-upload">

      <label>
        <ImagePlus size={18} />
        Subir comprobante
      </label>

      <input
        type="file"
        accept="image/*"
        onChange={(e) =>
          setReceipt(
            e.target.files?.[0] || null
          )
        }
      />

      {receipt && (

        <small className="receipt-success">
          <Check size={14} />
          {receipt.name}
        </small>

      )}

    </div>
  );
}