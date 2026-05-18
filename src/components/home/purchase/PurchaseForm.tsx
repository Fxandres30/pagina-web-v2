import {
  User,
  MessageCircle,
  Mail
} from "lucide-react";

interface Props {
  name: string;
  setName: (value: string) => void;
  phone: string;
  setPhone: (value: string) => void;
  email: string;
  setEmail: (value: string) => void;
}

export default function PurchaseForm({
  name,
  setName,
  phone,
  setPhone,
  email,
  setEmail
}: Props) {

  return (

    <div className="purchase-form">

      <div className="input-group">

        <User size={18} />

        <input
          type="text"
          placeholder="Nombre completo"
          value={name}
          onChange={(e) =>
            setName(
              e.target.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, "")
            )
          }
        />

      </div>

      <div className="input-group">

  <MessageCircle size={18} />

  <input
    type="tel"
    placeholder="WhatsApp"
    value={phone}
    onChange={(e) =>
      setPhone(
        e.target.value.replace(/\D/g, "")
      )
    }
  />

</div>

      <div className="input-group">

        <Mail size={18} />

        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

      </div>

    </div>
  );
}