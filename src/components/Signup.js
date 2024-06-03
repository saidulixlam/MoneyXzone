import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Switch,
  Text,
  useColorMode,
} from "@chakra-ui/react";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    password: '',
    confirmPassword: ''
  });

  const [loginData, setLoginData] = useState({
    name: '',
    password: ''
  });

  const [error, setError] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const { colorMode, toggleColorMode } = useColorMode();

  useEffect(() => {
    const savedColorMode = localStorage.getItem('chakra-ui-color-mode');
    if (savedColorMode && savedColorMode !== colorMode) {
      toggleColorMode();
    }
  }, [colorMode, toggleColorMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (isLogin) {
      setLoginData({ ...loginData, [name]: value });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      const userData = JSON.parse(localStorage.getItem('userData'));
      if (userData && userData.name === loginData.name && userData.password === loginData.password) {
        localStorage.setItem('login', true);
        navigate("/sale");
      } else {
        setError('Invalid Credentials');
      }
    } else {
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        return;
      }
      const { confirmPassword, ...userData } = formData;
      localStorage.setItem('userData', JSON.stringify(userData));
      localStorage.setItem('login', true);
      navigate("/sale");
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setError('');
  };

  const handleThemeToggle = () => {
    toggleColorMode();
    localStorage.setItem('chakra-ui-color-mode', colorMode === 'light' ? 'dark' : 'light');
  };

  return (
    <Box height="100vh" display="flex" justifyContent="center" alignItems="center">
      <Box
        width={{ lg: '33%', sm: '75%', md: '50%' }}
        mt="8"
        p="8"
        shadow="md"
        borderRadius="md"
        bg={colorMode === 'light' ? 'gray.100' : 'gray.700'}
      >
        <form onSubmit={handleSubmit}>
          <FormControl display="flex" justifyContent="space-between" alignItems="center" mb="4">
          <Switch id="theme-toggle" onChange={handleThemeToggle} isChecked={colorMode === 'dark'}>
        
            </Switch>
          </FormControl>
          <Text fontSize="3xl" fontWeight="bold" mb="4" textAlign="center">
            {isLogin ? 'Login' : 'Sign up'}
          </Text>
          <FormControl mb="4">
            <FormLabel htmlFor="name">Name</FormLabel>
            <Input
              type="text"
              id="name"
              name="name"
              value={isLogin ? loginData.name : formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />
          </FormControl>
          <FormControl mb="4">
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input
              type="password"
              id="password"
              name="password"
              value={isLogin ? loginData.password : formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </FormControl>
          {!isLogin && (
            <FormControl mb="4">
              <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
              <Input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                required
              />
            </FormControl>
          )}
          {error && <Text color="red.500" mb="4">{error}</Text>}
          <Button type="submit" colorScheme="blue" width="full" mt="4">
            {isLogin ? 'Login' : 'Signup'}
          </Button>
          <Text mt="4" textAlign="center">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <Button variant="link" colorScheme="blue" onClick={toggleForm}>
              {isLogin ? 'Signup' : 'Login'}
            </Button>
          </Text>
        </form>
      </Box>
    </Box>
  );
};

export default Signup;
