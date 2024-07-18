import React from 'react';
import { Box, Card, CardContent, Button, Typography, Modal, Rating, Stack, TextField } from '@mui/material';
import { EditNote, DeleteOutline } from '@mui/icons-material';
import './cardComponent.css'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: '1rem',
  boxShadow: 24,
  p: 4,
};
const updatePhone = async (id, updatedPhone) => {
  const res = await fetch(`http://localhost:3001/api/phones/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedPhone),
  });
  if (!res.ok) {
    throw new Error('Échec de modification.');
  }
  return res.json();
};
const deletePhone = async (id) => {
  const res = await fetch(`http://localhost:3001/api/phones/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) {
    throw new Error('Échec de suppression.');
  }
  return res.json();
};

export default function CardComponent({ phone, onPhoneUpdate, onPhoneDelete }) {
  const [open, setOpen] = React.useState(false);
  const [identif, setIdentif] = React.useState(phone._id);
  const [name, setName] = React.useState(phone.name);
  const [warrantyYears, setWarrantyYears] = React.useState(phone.warranty_years);
  const [rating, setRating] = React.useState(phone.rating);
  const [price, setPrice] = React.useState(phone.price);
  const [available, setAvailable] = React.useState(phone.available);
  const [type, setType] = React.useState(phone.type);



  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSave = async () => {
    const updatedPhone = {
      _id: identif,
      name,
      type,
      warranty_years: warrantyYears,
      rating,
      price,
      available,
    };

    try {
      await updatePhone(identif, updatedPhone);
      if (onPhoneUpdate) {
        onPhoneUpdate(identif, updatedPhone);
      }
      window.location.reload()
    } catch (error) {
      console.error('La tentative de modification a échoué.', error);
    }

    handleClose();
  };
  const handleDelete = async () => {
    try {
      await deletePhone(identif);
      if (onPhoneDelete) {
        onPhoneDelete(identif);
      }
      window.location.reload()

    } catch (error) {
      console.error('La tentative de suppression a échoué.', error);
    }
  };


  return (
    <Card className='cardContainer'>
      <div className='editIcon'>
        <div >
          <Button className='button' onClick={handleOpen}>
            <EditNote />
          </Button>
          <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography sx={{textAlign: 'center'}} id="modal-modal-title" variant="h6" component="h2">
              Modifier les informations
            </Typography>
            <Box component="form" sx={{ mt: 4 }}>
            <TextField
                label="ID"
                value={identif}
                onChange={(e) => setIdentif(e.target.value)}
                fullWidth
                sx={{ mb: 3 }}
              />  
              <TextField
                label="Disponibilité"
                value={available}
                onChange={(e) => setAvailable(e.target.value)}
                fullWidth
                sx={{ mb: 3 }}
              />              
              <TextField
                label="Nom"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
                sx={{ mb: 3 }}
              />
              <TextField
                label="Type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                fullWidth
                sx={{ mb: 3 }}
              />
              <TextField
                label="Garantie (années)"
                value={warrantyYears}
                onChange={(e) => setWarrantyYears(e.target.value)}
                fullWidth
                sx={{ mb: 2 }}
              />
              <Stack sx={{ mb: 2 }} spacing={1.5}>
                <TextField
                  label="Note"
                  type="number"
                  inputProps={{ step: 0.5, min: 0, max: 5 }}
                  value={rating}
                  onChange={(e) => setRating(parseFloat(e.target.value))}
                  fullWidth
                  sx={{ mb: 2 }}
                />
                <Rating className='modifRating'
                  name="rating"
                  value={rating}
                  precision={0.5}
                  onChange={(event, newValue) => {
                    setRating(newValue);
                  }}
                />
              </Stack>
              <TextField
                label="Prix"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                fullWidth
                sx={{ mb: 6, mt: 3}}
              />
              <Button onClick={handleSave} variant="contained" color="primary">
                Sauvegarder
              </Button>
            </Box>
          </Box>
          </Modal>
        </div>
        <div>
          <Button sx={{paddingLeft: '0'}} onClick={handleDelete} className='button'>
            <DeleteOutline />
          </Button>
        </div>

      </div>


      <CardContent className='cardContent'>
      <Typography sx={{fontSize: '0.875rem', fontWeight: 300}} variant="body2">
            ID : {phone._id}
        </Typography>
        <Typography variant="body2">
            {' '}
          {available ? (
            <span className='available'>Disponible</span>
          ) : (
            <span className='notAvailable'>Non disponible</span>
          )}
        </Typography>
        <div>
          <Typography sx={{fontSize: '1rem', fontWeight:500}} variant="h5" component="div">
            {phone.name}
          </Typography>
          <Typography sx={{fontSize: '0.875rem', fontWeight: 300}} variant="body2">
            {phone.type}
          </Typography>
          <Typography sx={{fontSize: '0.875rem', fontWeight: 300}} variant="body2">
            Garantie commerciale : {phone.warranty_years} ans
          </Typography>
        </div>

        <Typography sx={{fontSize: '0.75rem', fontWeight:500, display: 'flex'}} variant="body2">
          <Stack sx={{marginRight: '0.25rem'}} spacing={1}>
            <Rating className='rating' name="half-rating-read" defaultValue={phone.rating} precision={0.5} readOnly />
          </Stack>
          {phone.rating}/5
        </Typography>
        <Typography sx={{fontSize: '0.75rem', fontWeight: 300}} variant="body2">
          À partir de <br/> 
          <span className='price' >{phone.price} €</span>
        </Typography>
      </CardContent>
    </Card>
  );
}
