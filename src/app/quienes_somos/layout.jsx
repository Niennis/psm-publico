'use client'
import { useMediaQuery } from "@mui/material";
import FooterDae from "@/components/Footer";
import { FaArrowLeft } from "react-icons/fa";
import { useRouter, usePathname } from "next/navigation";

export default function QuienesSomosLayout({ children }) {
  const matches = useMediaQuery('(min-width:600px)');
  const router = useRouter()
  const pathname = usePathname()

  const isActive = (href) => {
    return pathname === href ? 'quienes-somos-active' : 'nav-link-quienes-somos';
  };
  
  return (
    <>
      {matches && <div style={{
        height: '520px',
        overflow: 'hidden',
        backgroundImage: `url(${process.env.NEXT_PUBLIC_BASE_IMG}quienes_somos_cabecera.jpg${process.env.NEXT_PUBLIC_KEY_IMG})`,
        backgroundPosition: 'center 80%',
        backgroundSize: 'cover'
      }}>
      </div>
      }

<div className="row flex-column d-flex align-items-center sailec mt--md-5 section-quienes-somos" /* style={{padding:0, margin: 0}} */>
        <div className="col-12 mt--md-5" style={{ padding: 0 }}>
          <div>
              {matches &&
                <>
                  <button className='btn mt-4 mb-5'
                    style={{
                      border: '1px solid #A6A6A6',
                      height: '56px',
                      width: '163px',
                      padding: '0px 24px',
                      borderRadius: '100px',
                      marginLeft: '96px'
                    }}
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
