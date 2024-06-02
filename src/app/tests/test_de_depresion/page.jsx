'use client'
import { useState } from "react";
import Link from "next/link";
import { useForm } from 'react-hook-form';
import { useMediaQuery } from "@mui/material";
import { saludMental01 } from "@/components/imagepath";
import { FaArrowLeft } from "react-icons/fa";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
const preguntas = [
  {
    pregunta: 'Tener poco interés o placer en hacer las cosas.',
    label: 'poco_interes'
  },
  {
    pregunta: 'Sentirse desanimado/a, deprimido/a, o sin esperanza.',
    label: 'desanimado'
  },
  {
    pregunta: 'Con problemas en dormirse o en mantenerse dormido/a, o en dormir demasiado.',
    label: 'mal_dormir'
  },
  {
    pregunta: 'Sentirse cansado/a o tener poca energía.',
    label: 'cansado'
  },
  {
    pregunta: 'Tener poco apetito o comer en exceso.',
    label: 'comida'
  },
  {
    pregunta: 'Sentir falta de amor propio o que sea un fracaso que decepcionara a si mismo/a a su familia.',
    label: 'fracaso'
  },
  {
    pregunta: 'Tener dificultad para concentrarse en cosas tales como leer el periódico o mirar televisión.',
    label: 'concentracion'
  },
  {
    pregunta: 'Se mueve o habla tan lentamente que otra gente se podría dar cuenta o de lo contrario, está tan agitado/a o inquieto/a que se mueve mucho más de lo acostumbrado.',
    label: 'percepcion'
  },
  {
    pregunta: 'Se le han ocurrido pensamientos de que sería mejor estar muerto/a o de que haría daño de alguna manera.',
    label: 'pensamientos_muerte'
  }
]

const resultados = [
  {
    puntaje: [0, 6],
    descripcion: 'Depresión leve'
  },
  {
    puntaje: [7, 13],
    descripcion: 'Depresión moderada'
  },
  {
    puntaje: [14, 20],
    descripcion: 'Depresión alta'
  },
  {
    puntaje: [21, 27],
    descripcion: 'Depresión grave'
  },
]

const determinarDescripcion = (puntaje) =>
  resultados.find(({ puntaje: [min, max] }) => puntaje >= min && puntaje <= max) || 'Puntaje fuera de rango';

const TestDepresion = () => {
  const [resultado, setResultado] = useState(null)
  const matches = useMediaQuery('(min-width:600px)');
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { register, handleSubmit, watch,
    formState: { errors }
  } = useForm()


  const calculate = () => {
    const data = watch()

    let values = Object.values(data);

    // Sumamos los valores
    let sum = values.reduce((accumulator, currentValue) => accumulator + parseInt(currentValue), 0);
    setResultado(sum)
    console.log(sum)
  }

  const onSubmit = handleSubmit(async (data) => {
    console.log(data)
  })



  return (
    <>
      {matches && <div style={{
        height: '520px',
        overflow: 'hidden'
      }}>
        <img
          alt="#"
          src={saludMental01.src}
          width={'100%'}
          style={{
            backgroundPosition: 'center'
          }}
        />
      </div>
      }
      <div className="page-wrapper" style={{ margin: 'auto' }}>
        <div className="content">
          {/* Page Header */}
          {matches &&
            <button className='btn mt-4 mb-2'
              style={{
                border: '1px solid #A6A6A6',
                height: '56px',
                width: '163px',
                padding: '0px 24px',
                borderRadius: '100px',
                marginLeft: '76px'
              }}
              onClick={() => router.back()}
            >
              <FaArrowLeft /> Volver
            </button>
          }
          {/* /Page Header */}
          <div className="row">
            <div className="col-sm-12">
              <div className="card" style={{ border: 'none' }}>
                <div className="card-body">
                  <form>
                    <div className="row">
                      <div className="col-12">
                        <div className="form-heading">
                          <div className="card-body flex-row d-flex justify-content-center mt-4">
                            <h2
                              className="sailec"
                              style={{ fontWeight: 700, fontSize: '32px', lineHeight: '40px', textAlign: 'center' }}>
                              Test de Depresión
                            </h2>
                          </div>
                          <p>
                            Durante las dos últimas semanas ¿con qué frecuencia le han molestado los siguientes problemas?
                          </p>
                          <div className="ms-5">
                            <p>0 = Nunca</p>
                            <p>1 = Varios días</p>
                            <p>2 = Más de la mitad de los días</p>
                            <p>3 = Casi todos los días</p>
                          </div>
                        </div>
                      </div>
                      {
                        preguntas.map((item, index) => (
                          <div
                            className="col-12 col-md-8"
                            key={index + item.label}
                            style={{
                              background: index % 2 === 0 && 'lightgrey'
                            }}
                          >
                            <div className="form-group select-gender d-flex justify-content-between" style={{ margin: 'auto', padding: '10px' }}>

                              <label className="col-9">
                                {item.pregunta}
                              </label>
                              <div className=" col-3">
                                <div className="form-check-inline">
                                  <label className="form-check-label">
                                    <input
                                      type="radio"
                                      name={item.label}
                                      value={0}
                                      className="form-check-input"
                                      {...register(item.label)}
                                    />
                                    0
                                  </label>
                                </div>
                                <div className="form-check-inline">
                                  <label className="form-check-label">
                                    <input
                                      type="radio"
                                      name={item.label}
                                      value={1}
                                      className="form-check-input"
                                      {...register(item.label)}
                                    />
                                    1
                                  </label>
                                </div>
                                <div className="form-check-inline">
                                  <label className="form-check-label">
                                    <input
                                      type="radio"
                                      name={item.label}
                                      value={2}
                                      className="form-check-input"
                                      {...register(item.label)}
                                    />
                                    2
                                  </label>
                                </div>
                                <div className="form-check-inline">
                                  <label className="form-check-label">
                                    <input
                                      type="radio"
                                      name={item.label}
                                      value={3}
                                      className="form-check-input"
                                      {...register(item.label)}
                                    />
                                    3
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      }

                      <div className="col-12">
                        <div className="doctor-submit text-end">
                          <button
                            type="button"
                            className="btn btn-primary submit-form me-2"
                            onClick={calculate}
                          >
                            Obtener resultados
                          </button>
                          <button
                            type="submit"
                            className="btn btn-primary cancel-form"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-10">
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Typography id="modal-modal-title" variant="h6" component="h2">
                    Text in a modal
                  </Typography>
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  {resultado >= 0 && <p>Presentas: {determinarDescripcion(resultado).descripcion} </p>}
                  </Typography>
                </Box>
              </Modal>
            </div>

          </div>
        </div>
      </div>

    </>
  )

}

export default TestDepresion;