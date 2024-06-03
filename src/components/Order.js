import React, { useState, useEffect } from 'react';
import { Box, Button, Tab, TabList, TabPanel, TabPanels, Tabs, Table, Thead, Tbody, Tr, Th, Td, IconButton, useDisclosure, useToast } from '@chakra-ui/react';
import { AddIcon, EditIcon } from '@chakra-ui/icons';
import { useForm } from 'react-hook-form';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from '@chakra-ui/react';
// import { customers, products, saleOrders, buyOrders } from '../util/dummy';

const SaleOrders = () => {
  const [activeSaleOrders, setActiveSaleOrders] = useState([]);
  const [completedSaleOrders, setCompletedSaleOrders] = useState([]);
  const [editingOrder, setEditingOrder] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { register, handleSubmit, reset } = useForm();
  const toast = useToast();
  //   const { colorMode } = useColorMode();

  useEffect(() => {
    const savedActiveSaleOrders = JSON.parse(localStorage.getItem('activeSaleOrders')) || [];
    const savedCompletedSaleOrders = JSON.parse(localStorage.getItem('completedSaleOrders')) || [];

    setActiveSaleOrders(savedActiveSaleOrders);
    setCompletedSaleOrders(savedCompletedSaleOrders);
  }, []);

  const saveToLocalStorage = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  const createSaleOrder = (data) => {
    const newOrder = { ...data, id: new Date().getTime() }; // Generate a unique ID
    const updatedActiveOrders = [...activeSaleOrders, newOrder];
    setActiveSaleOrders(updatedActiveOrders);
    saveToLocalStorage('activeSaleOrders', updatedActiveOrders);
    return newOrder;
  };

  const editSaleOrder = (data) => {
    const updatedActiveOrders = activeSaleOrders.filter(order => order.id !== data.id);
    const updatedCompletedOrders = [...completedSaleOrders, data];
    setActiveSaleOrders(updatedActiveOrders);
    setCompletedSaleOrders(updatedCompletedOrders);
    saveToLocalStorage('activeSaleOrders', updatedActiveOrders);
    saveToLocalStorage('completedSaleOrders', updatedCompletedOrders);
    return data;
  };

  const handleCreateSaleOrder = (data) => {
    createSaleOrder(data);
    onClose();
    toast({ title: "Sale order created.", status: "success", duration: 2000 });
  };

  const handleEditSaleOrder = (data) => {
    editSaleOrder(data);
    onClose();
    toast({ title: "Sale order updated and moved to completed.", status: "success", duration: 2000 });
  };

  const openEditModal = (order) => {
    setEditingOrder(order);
    reset(order);
    onOpen();
  };

  return (
    <Box p="4" m="4">
      <Tabs variant="enclosed">
        <TabList>
          <Tab>Active Sale Orders</Tab>
          <Tab>Completed Sale Orders</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Button leftIcon={<AddIcon />} onClick={() => { reset(); onOpen(); }} colorScheme="blue" mb="4"> Sale Order</Button>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>ID</Th>
                  <Th>Customer</Th>
                  <Th>Date</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {activeSaleOrders.map(order => (
                  <Tr key={order.id}>
                    <Td>{order.id}</Td>
                    <Td>{order.customer_id}</Td>
                    <Td>{order.invoice_date}</Td>
                    <Td>
                      <IconButton
                        icon={<EditIcon />}
                        onClick={() => openEditModal(order)}
                      />
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TabPanel>
          <TabPanel>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>ID</Th>
                  <Th>Customer</Th>
                  <Th>Date</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {completedSaleOrders.map(order => (
                  <Tr key={order.id}>
                    <Td>{order.id}</Td>
                    <Td>{order.customer_id}</Td>
                    <Td>{order.invoice_date}</Td>
                    <Td>
                      <IconButton
                        icon={<EditIcon />}
                        onClick={() => openEditModal(order)}
                        isDisabled
                      />
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TabPanel>
        </TabPanels>
      </Tabs>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent display="flex" flexDirection="column" justifyContent="center" alignItems="center">
          <ModalHeader>{editingOrder ? 'Edit Sale Order' : 'Create Sale Order'}</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit(editingOrder ? handleEditSaleOrder : handleCreateSaleOrder)}>
            <ModalBody display="flex" flexDirection="column" gap="4">
              <input style={{ padding: '8px', marginBottom: '4px' ,borderRadius:'8px' }} type="text" placeholder="Customer ID" {...register('customer_id', { required: true })} disabled={editingOrder} />
              <input style={{ padding: '8px', marginBottom: '4px' ,borderRadius:'8px' }} type="text" placeholder="SKU ID" {...register('sku_id', { required: true })} />
              <input style={{padding: '8px', marginBottom: '4px' ,borderRadius:'8px' }} type="number" placeholder="Price" {...register('price', { required: true })} />
              <input style={{ padding: '8px', marginBottom: '4px' ,borderRadius:'8px' }} type="number" placeholder="Quantity" {...register('quantity', { required: true })} />
              <input style={{ padding: '8px', marginBottom: '4px' ,borderRadius:'8px' }} type="text" placeholder="Invoice No" {...register('invoice_no', { required: true })} />
              <input style={{ padding: '8px', marginBottom: '4px' ,borderRadius:'8px' }} type="date" placeholder="Invoice Date" {...register('invoice_date', { required: true })} />
              <label style={{ padding: '4px', borderRadius:'8px' }}>
                <input type="checkbox" {...register('paid')} style={{margin:'4px 6px'}}/>
                Paid
              </label>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" type="submit">{editingOrder ? 'Update' : 'Create'}</Button>
              <Button variant="ghost" onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default SaleOrders;
