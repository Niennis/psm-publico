'use client'
import Image from "next/image";
import { useMediaQuery } from "@mui/material";
import FooterDae from "@/components/Footer";
import { FaArrowLeft } from "react-icons/fa";
import { useRouter, usePathname } from "next/navigation";

export default function IntervencionEnPromocionYPrevencion({ children }) {
  const isMediumSize = useMediaQuery('(min-width:768px)');
  const router = useRouter()
  const pathname = usePathname()

  const isActive = (href) => {
    return pathname === href ? 'quienes-somos-active' : 'nav-link-quienes-somos';
  };

  return (
    <>
      {isMediumSize && <div style={{
        height: '620px',
        overflow: 'hidden',
        position: 'relative'
      }}>
        <Image
          src={`${process.env.NEXT_PUBLIC_BASE_IMG}promocion_prevencion_cabecera.jpg${process.env.NEXT_PUBLIC_KEY_IMG}`}
          alt="Promoción y prevención cabecera"
          height={0}
          width={0}
          sizes="100vw"
          fill
          priority
          style={{
            objectFit: 'cover',
            objectPosition: 'center 5%',
            height: '100%',
            width: '100%',
          }}
        />
      </div>
      }

      <div className="row flex-column d-flex align-items-center mt--md-5 section-quienes-somos m-0 p-0" >
        <div className="col-12 mt--md-5 p-0">
          <div>
            {isMediumSize &&
              <>
                <button className=' mt-4 mb-5 lato-btn btn-back-desktop'
                  onClick={() => router.back()}
                >
                  <FaArrowLeft /> Volver
                </button>
              </>
            }
            {children}
          </div>
        </div>
      </div>
      <FooterDae />
    </>
  );
}
