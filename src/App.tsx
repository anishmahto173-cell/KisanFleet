/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { WelcomeSignInScreen } from './components/screens/WelcomeSignInScreen';
import { EquipmentDiscoveryScreen } from './components/screens/EquipmentDiscoveryScreen';
import { EquipmentDetailScreen } from './components/screens/EquipmentDetailScreen';
import { CooperativeDashboardScreen } from './components/screens/CooperativeDashboardScreen';
import { FarmerDashboardScreen } from './components/screens/FarmerDashboardScreen';
import { BookingManagementScreen } from './components/screens/BookingManagementScreen';
import { PaymentSettlementScreen } from './components/screens/PaymentSettlementScreen';
import { OperatorCoordinationScreen } from './components/screens/OperatorCoordinationScreen';
import { BookingModal } from './components/modals/BookingModal';
import {
  fetchEquipmentApi,
  fetchBookingsApi,
  createBookingApi,
} from './lib/api';
import { ToastProvider } from './context/ToastContext';

import {
  INITIAL_EQUIPMENT_DATA,
  INITIAL_BOOKINGS,
  INITIAL_TRANSACTIONS,
  INITIAL_OPERATORS,
  INITIAL_HUB_METRICS,
} from './data/mockFleet';
import { Equipment, BookingOrder, OperationalRole } from './types/fleet';

export default function App() {
  // Navigation & Screen selection
  // activeScreen: 1 to 10 matching the 10 Stitch screens
  const [activeScreen, setActiveScreen] = useState<number>(2); // Default to Screen 2 Equipment Discovery
  const [currentTab, setCurrentTab] = useState<string>('discovery');

  // Application State
  const [currency, setCurrency] = useState<'USD' | 'INR'>('USD');
  const [activeRole, setActiveRole] = useState<OperationalRole>('farmer');
  const [selectedHub, setSelectedHub] = useState<string>('Shenandoah Co-op Hub');

  // Fleet & Booking Data State
  const [equipmentList, setEquipmentList] = useState<Equipment[]>(INITIAL_EQUIPMENT_DATA);
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment>(INITIAL_EQUIPMENT_DATA[0]);
  const [bookings, setBookings] = useState<BookingOrder[]>(INITIAL_BOOKINGS);
  const [transactions] = useState(INITIAL_TRANSACTIONS);
  const [operators] = useState(INITIAL_OPERATORS);
  const [metrics] = useState(INITIAL_HUB_METRICS);

  // Sync with backend API on mount
  useEffect(() => {
    fetchEquipmentApi().then((data) => {
      if (data && data.length > 0) setEquipmentList(data);
    });
    fetchBookingsApi().then((data) => {
      if (data && data.length > 0) setBookings(data);
    });
  }, []);

  // Booking Modal State
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingModalInitialDate, setBookingModalInitialDate] = useState(18);
  const [bookingModalInitialShift, setBookingModalInitialShift] = useState('morning');

  // Screen Switcher Handler
  const handleSelectScreen = (screenNumber: number) => {
    setActiveScreen(screenNumber);
    switch (screenNumber) {
      case 1:
        // Welcome Sign In
        break;
      case 2:
        setCurrentTab('discovery');
        break;
      case 3:
        setCurrentTab('dashboard');
        setActiveRole('fleet_owner');
        break;
      case 4:
        setCurrentTab('discovery');
        setSelectedEquipment(INITIAL_EQUIPMENT_DATA[0]); // John Deere S780
        setCurrency('USD');
        break;
      case 5:
        setCurrentTab('discovery');
        break;
      case 6:
        setCurrentTab('discovery');
        setSelectedEquipment(INITIAL_EQUIPMENT_DATA[0]);
        setCurrency('INR');
        break;
      case 7:
        setCurrentTab('dashboard');
        setActiveRole('farmer');
        break;
      case 8:
        setCurrentTab('bookings');
        break;
      case 9:
        setCurrentTab('payments');
        break;
      case 10:
        setCurrentTab('operators');
        break;
      default:
        break;
    }
  };

  // Tab change handler
  const handleTabChange = (tab: string) => {
    setCurrentTab(tab);
    if (tab === 'discovery') {
      setActiveScreen(2);
    } else if (tab === 'dashboard') {
      setActiveScreen(activeRole === 'farmer' ? 7 : 3);
    } else if (tab === 'bookings') {
      setActiveScreen(8);
    } else if (tab === 'payments') {
      setActiveScreen(9);
    } else if (tab === 'operators') {
      setActiveScreen(10);
    }
  };

  // Inspect equipment detail
  const handleViewEquipmentDetails = (equipment: Equipment) => {
    setSelectedEquipment(equipment);
    setActiveScreen(currency === 'INR' ? 6 : 4);
  };

  // Open booking modal
  const handleOpenBooking = (
    equipment: Equipment,
    date: number = 18,
    shift: string = 'morning'
  ) => {
    setSelectedEquipment(equipment);
    setBookingModalInitialDate(date);
    setBookingModalInitialShift(shift);
    setIsBookingModalOpen(true);
  };

  // Add new confirmed booking
  const handleConfirmNewBooking = async (newBooking: BookingOrder) => {
    setBookings((prev) => [newBooking, ...prev]);
    setCurrentTab('bookings');
    setActiveScreen(8);
    // Persist to backend API / MongoDB
    await createBookingApi(newBooking);
  };

  // Currency toggle
  const handleCurrencyToggle = () => {
    const nextCurrency = currency === 'USD' ? 'INR' : 'USD';
    setCurrency(nextCurrency);
    // If currently on Screen 4 or 6, toggle to the respective currency screen
    if (activeScreen === 4) setActiveScreen(6);
    else if (activeScreen === 6) setActiveScreen(4);
  };

  // Render the current active screen
  const renderScreen = () => {
    switch (activeScreen) {
      case 1:
        // Screen 1: Welcome Sign In
        return (
          <WelcomeSignInScreen
            onSuccessLogin={(role) => {
              setActiveRole(role);
              handleSelectScreen(2);
            }}
            activeRole={activeRole}
            onRoleChange={setActiveRole}
          />
        );

      case 2:
        // Screen 2: Equipment Discovery (Default Catalog)
        return (
          <EquipmentDiscoveryScreen
            equipmentList={equipmentList}
            currency={currency}
            onViewDetails={handleViewEquipmentDetails}
            onBook={(eq) => handleOpenBooking(eq)}
            initialFilteredState={false}
          />
        );

      case 3:
        // Screen 3: Cooperative / Fleet Hub Dashboard
        return (
          <CooperativeDashboardScreen
            metrics={metrics}
            currency={currency}
            equipmentList={equipmentList}
            onViewEquipment={handleViewEquipmentDetails}
            onNavigateToTab={handleTabChange}
          />
        );

      case 4:
        // Screen 4: Equipment Detail & Availability (USD)
        return (
          <EquipmentDetailScreen
            equipment={selectedEquipment}
            currency="USD"
            onBack={() => setActiveScreen(2)}
            onProceedToBooking={(eq, d, s) => handleOpenBooking(eq, d, s)}
          />
        );

      case 5:
        // Screen 5: Filtered Equipment Discovery (4 Machines Matched)
        return (
          <EquipmentDiscoveryScreen
            equipmentList={equipmentList}
            currency={currency}
            onViewDetails={handleViewEquipmentDetails}
            onBook={(eq) => handleOpenBooking(eq)}
            initialFilteredState={true}
          />
        );

      case 6:
        // Screen 6: Equipment Detail & Availability (INR Regional Variant)
        return (
          <EquipmentDetailScreen
            equipment={selectedEquipment}
            currency="INR"
            onBack={() => setActiveScreen(2)}
            onProceedToBooking={(eq, d, s) => handleOpenBooking(eq, d, s)}
          />
        );

      case 7:
        // Screen 7: Farmer / Operator Dashboard
        return (
          <FarmerDashboardScreen
            currency={currency}
            onNavigateToTab={handleTabChange}
            onInspectEquipment={handleViewEquipmentDetails}
            featuredEquipment={INITIAL_EQUIPMENT_DATA[1]}
          />
        );

      case 8:
        // Screen 8: Booking Management & Dispatch Orders
        return (
          <BookingManagementScreen
            bookings={bookings}
            currency={currency}
            onNewBookingClick={() => {
              setSelectedEquipment(INITIAL_EQUIPMENT_DATA[0]);
              setIsBookingModalOpen(true);
            }}
          />
        );

      case 9:
        // Screen 9: Rental Charges & Settlement Ledger
        return (
          <PaymentSettlementScreen
            transactions={transactions}
            metrics={metrics}
            currency={currency}
          />
        );

      case 10:
        // Screen 10: Fleet Listings & Operator Assignment
        return (
          <OperatorCoordinationScreen
            operators={operators}
            equipmentList={equipmentList}
            currency={currency}
          />
        );

      default:
        return (
          <EquipmentDiscoveryScreen
            equipmentList={equipmentList}
            currency={currency}
            onViewDetails={handleViewEquipmentDetails}
            onBook={(eq) => handleOpenBooking(eq)}
          />
        );
    }
  };

  return (
    <ToastProvider>
      <div className="min-h-screen bg-[#FAF9F4] text-[#1B1C19] flex flex-col font-sans selection:bg-[#10B981] selection:text-[#072417]">
        {/* Top Application Header */}
        <Header
          currentTab={currentTab}
          onTabChange={handleTabChange}
          currency={currency}
          onCurrencyToggle={handleCurrencyToggle}
          activeRole={activeRole}
          onRoleChange={(r) => {
            setActiveRole(r);
            if (currentTab === 'dashboard') {
              setActiveScreen(r === 'farmer' ? 7 : 3);
            }
          }}
          selectedHub={selectedHub}
          onHubChange={setSelectedHub}
          onSignOut={() => setActiveScreen(1)}
          activeScreenIndex={activeScreen}
          onSelectScreen={handleSelectScreen}
        />

        {/* Main Content Area */}
        <main className="flex-1">{renderScreen()}</main>

        {/* Interactive Booking / Dispatch Modal */}
        <BookingModal
          isOpen={isBookingModalOpen}
          equipment={selectedEquipment}
          currency={currency}
          onClose={() => setIsBookingModalOpen(false)}
          onConfirmBooking={handleConfirmNewBooking}
          initialDate={bookingModalInitialDate}
          initialShift={bookingModalInitialShift}
        />

        {/* Utilitarian Footer */}
        <Footer />
      </div>
    </ToastProvider>
  );
}
