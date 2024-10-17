<template>
    <div>
        <ul class="flex space-x-2 rtl:space-x-reverse">
            <li>
                <router-link :to="{name:'dashboard'}" class="text-primary hover:underline">
                    Escritorio
                </router-link>
            </li>
            <li class="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                <router-link :to="{name:'companies-show', params: {id: route.params.id}}" class="text-primary hover:underline">
                   Empresa
                </router-link>
            </li>
            <li class="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                <span>Editar</span>
            </li>
        </ul>

        <div class="pt-5">
            <TabGroup>
                <TabList
                    class="flex font-semibold border-b border-[#ebedf2] dark:border-[#191e3a] mb-5 whitespace-nowrap overflow-y-auto">
                    <Tab as="template" v-slot="{ selected }">
                        <a href="javascript:;"
                            class="flex gap-2 p-4 border-b border-transparent hover:border-primary hover:text-primary !outline-none"
                            :class="{ '!border-primary text-primary': selected }">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg" class="w-5 h-5">
                                <path opacity="0.5"
                                    d="M2 12.2039C2 9.91549 2 8.77128 2.5192 7.82274C3.0384 6.87421 3.98695 6.28551 5.88403 5.10813L7.88403 3.86687C9.88939 2.62229 10.8921 2 12 2C13.1079 2 14.1106 2.62229 16.116 3.86687L18.116 5.10812C20.0131 6.28551 20.9616 6.87421 21.4808 7.82274C22 8.77128 22 9.91549 22 12.2039V13.725C22 17.6258 22 19.5763 20.8284 20.7881C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.7881C2 19.5763 2 17.6258 2 13.725V12.2039Z"
                                    stroke="currentColor" stroke-width="1.5" />
                                <path d="M12 15L12 18" stroke="currentColor" stroke-width="1.5"
                                    stroke-linecap="round" />
                            </svg>
                            Información
                        </a>
                    </Tab>

                    <Tab as="template" v-slot="{ selected }">
                        <a href="javascript:;"
                            class="flex gap-2 p-4 border-b border-transparent hover:border-primary hover:text-primary !outline-none"
                            :class="{ '!border-primary text-primary': selected }">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg" class="w-5 h-5">
                                <circle opacity="0.5" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5" />
                                <path d="M12 6V18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                <path
                                    d="M15 9.5C15 8.11929 13.6569 7 12 7C10.3431 7 9 8.11929 9 9.5C9 10.8807 10.3431 12 12 12C13.6569 12 15 13.1193 15 14.5C15 15.8807 13.6569 17 12 17C10.3431 17 9 15.8807 9 14.5"
                                    stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                            </svg>
                           Conexiones Externas
                        </a>
                    </Tab>

                    <Tab as="template" v-slot="{ selected }">
                        <a href="javascript:;"
                           class="flex gap-2 p-4 border-b border-transparent hover:border-primary hover:text-primary !outline-none"
                           :class="{ '!border-primary text-primary': selected }">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                 xmlns="http://www.w3.org/2000/svg" class="w-5 h-5">
                                <circle cx="12" cy="6" r="4" stroke="currentColor" stroke-width="1.5" />
                                <ellipse opacity="0.5" cx="12" cy="17" rx="7" ry="4" stroke="currentColor"
                                         stroke-width="1.5" />
                            </svg>
                            Usuarios
                        </a>
                    </Tab>
                    <Tab as="template" v-slot="{ selected }" disabled>
                        <a href="javascript:;"
                            class="flex gap-2 p-4 border-b border-transparent hover:border-primary hover:text-primary !outline-none"
                            :class="{ '!border-primary text-primary': selected }">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg" class="w-5 h-5">
                                <circle opacity="0.5" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5" />
                                <path d="M12 6V18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                <path
                                    d="M15 9.5C15 8.11929 13.6569 7 12 7C10.3431 7 9 8.11929 9 9.5C9 10.8807 10.3431 12 12 12C13.6569 12 15 13.1193 15 14.5C15 15.8807 13.6569 17 12 17C10.3431 17 9 15.8807 9 14.5"
                                    stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                            </svg>
                            Payment Details
                        </a>
                    </Tab>

                    <Tab as="template" v-slot="{ selected }" disabled>
                        <a href="javascript:;"
                            class="flex gap-2 p-4 border-b border-transparent hover:border-primary hover:text-primary !outline-none"
                            :class="{ '!border-primary text-primary': selected }">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path opacity="0.5" d="M2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12Z" stroke="#1C274C" stroke-width="1.5"/>
                                <circle cx="8" cy="10" r="2" stroke="#1C274C" stroke-width="1.5"/>
                                <circle cx="2" cy="2" r="2" transform="matrix(1 0 0 -1 14 16)" stroke="#1C274C" stroke-width="1.5"/>
                                <path d="M8 14V19" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"/>
                                <path d="M16 10V5" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"/>
                                <path d="M8 5V6" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"/>
                                <path d="M16 19V18" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"/>
                            </svg>
                            Preferences
                        </a>
                    </Tab>

                    <Tab as="template" v-slot="{ selected }" disabled>
                        <a href="javascript:;"
                            class="flex gap-2 p-4 border-b border-transparent hover:border-primary hover:text-primary !outline-none"
                            :class="{ '!border-primary text-primary': selected }">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg" class="w-5 h-5">
                                <path
                                    d="M16.1007 13.359L16.5562 12.9062C17.1858 12.2801 18.1672 12.1515 18.9728 12.5894L20.8833 13.628C22.1102 14.2949 22.3806 15.9295 21.4217 16.883L20.0011 18.2954C19.6399 18.6546 19.1917 18.9171 18.6763 18.9651M4.00289 5.74561C3.96765 5.12559 4.25823 4.56668 4.69185 4.13552L6.26145 2.57483C7.13596 1.70529 8.61028 1.83992 9.37326 2.85908L10.6342 4.54348C11.2507 5.36691 11.1841 6.49484 10.4775 7.19738L10.1907 7.48257"
                                    stroke="currentColor" stroke-width="1.5" />
                                <path opacity="0.5"
                                    d="M18.6763 18.9651C17.0469 19.117 13.0622 18.9492 8.8154 14.7266C4.81076 10.7447 4.09308 7.33182 4.00293 5.74561"
                                    stroke="currentColor" stroke-width="1.5" />
                                <path opacity="0.5"
                                    d="M16.1007 13.3589C16.1007 13.3589 15.0181 14.4353 12.0631 11.4971C9.10807 8.55886 10.1907 7.48242 10.1907 7.48242"
                                    stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                            </svg>
                            Danger Zone
                        </a>
                    </Tab>
                </TabList>
                <TabPanels>
                    <form @submit.prevent="editCompany">
                        <TabPanel>
                            <div>
                                <div class="panel pb-1.5 mt-6">
                                    <div
                                        class="border border-[#ebedf2] dark:border-[#191e3a] rounded-md p-4 mb-2 bg-white dark:bg-[#0e1726]">
                                        <h6 class="text-lg font-bold mb-5">General Information</h6>
                                        <div class="flex flex-col sm:flex-row">
                                            <div class="ltr:sm:mr-4 rtl:sm:ml-4 w-full sm:w-2/12 mb-5">
                                                <div class="custom-file-container">
                                                    <div class="mb-5">
                                                        <label for="file">Imagen</label>
                                                        <div>
                                                            <input
                                                                id="file"
                                                                type="file"
                                                                class="form-input file:py-2 file:px-4 file:border-0 file:font-semibold p-0 file:bg-primary/90 ltr:file:mr-5 rtl:file:ml-5 file:text-white file:hover:bg-primary"
                                                                multiple
                                                                accept="image/*"
                                                                @change="handleFileUpload($event)"
                                                            />
                                                        </div>
                                                        <div class="text-center mt-6" v-if="loading">
                                                            <!-- custom loader -->
                                                            <span
                                                                class="animate-[spin_2s_linear_infinite] border-8 border-[#f1f2f3] border-l-primary border-r-primary rounded-full w-14 h-14 inline-block align-middle m-auto mb-10"></span>
                                                        </div>
                                                        <div class="text-danger mt-2" id="file"></div>
                                                    </div>
                                                    <div class="flex flex-col justify-center items-center" >
                                                        <img :src="image" :alt="companyData.name"
                                                             class="w-20 h-20 md:w-32 md:h-32 rounded-full object-cover mx-auto"/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-5">
                                                <div>
                                                    <label for="name">Nombre *</label>
                                                    <input id="name" type="text" placeholder="Company Name"
                                                        class="form-input" v-model="companyData.name" required />
                                                </div>
                                                <div>
                                                    <label for="identification">Nit *</label>
                                                    <input id="identification" type="text" placeholder="Company identification"
                                                        class="form-input" v-model="companyData.identification" required />
                                                </div>
                                                <div>
                                                    <label for="address">Dirección *</label>
                                                    <input id="address" type="text" placeholder="Company Address"
                                                        class="form-input" v-model="companyData.address" required />
                                                </div>
                                                <div>
                                                    <label for="phone">Teléfono *</label>
                                                    <input id="phone" type="text" placeholder="+57 300 912-2995"
                                                        class="form-input" v-model="companyData.phone" required />
                                                </div>
                                                <div>
                                                    <label for="email">Email *</label>
                                                    <input id="email" type="email" placeholder="info@ejesatelital.com"
                                                        class="form-input" v-model="companyData.email" required />
                                                </div>
                                                <div>
                                                    <label for="web">Website</label>
                                                    <input id="web" type="text"
                                                        placeholder="https://www.ejesatelital.com/" class="form-input"
                                                        v-model="companyData.web" />
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </TabPanel>

                        <TabPanel>
                            <div>
                                <apiConfigurations :companyData="companyData" />
                            </div>
                        </TabPanel>
                        <TabPanel>
                           <users-component :company-data="companyData"/>
                        </TabPanel>
                        <TabPanel>
                            <div>
                                <div class="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
                                    <div class="panel">
                                        <div class="mb-5">
                                            <h5 class="font-semibold text-lg mb-4">Dirección de Facturación</h5>
                                            <p>
                                                Los cambios en su información de <span class="text-primary">facturación</span>
                                                entrarán en vigencia a partir del pago programado y se reflejarán en su próxima factura.
                                            </p>
                                        </div>
                                        <div class="mb-5">
                                            <div class="border-b border-[#ebedf2] dark:border-[#1b2e4b]">
                                                <div class="flex items-start justify-between py-3">
                                                    <h6 class="text-[#515365] font-bold dark:text-white-dark text-[15px]">
                                                        Address #1
                                                        <span
                                                            class="block text-white-dark dark:text-white-light font-normal text-xs mt-1">2249
                                                            Caynor Circle, New Brunswick, New Jersey</span>
                                                    </h6>
                                                    <div class="flex items-start justify-between ltr:ml-auto rtl:mr-auto">
                                                        <button class="btn btn-dark">Edit</button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="border-b border-[#ebedf2] dark:border-[#1b2e4b]">
                                                <div class="flex items-start justify-between py-3">
                                                    <h6 class="text-[#515365] font-bold dark:text-white-dark text-[15px]">
                                                        Address #2
                                                        <span
                                                            class="block text-white-dark dark:text-white-light font-normal text-xs mt-1">4262
                                                            Leverton Cove Road, Springfield, Massachusetts</span>
                                                    </h6>
                                                    <div class="flex items-start justify-between ltr:ml-auto rtl:mr-auto">
                                                        <button class="btn btn-dark">Edit</button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <div class="flex items-start justify-between py-3">
                                                    <h6 class="text-[#515365] font-bold dark:text-white-dark text-[15px]">
                                                        Address #3
                                                        <span
                                                            class="block text-white-dark dark:text-white-light font-normal text-xs mt-1">2692
                                                            Berkshire Circle, Knoxville, Tennessee</span>
                                                    </h6>
                                                    <div class="flex items-start justify-between ltr:ml-auto rtl:mr-auto">
                                                        <button class="btn btn-dark">Edit</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <button class="btn btn-primary">Add Address</button>
                                    </div>
                                    <div class="panel">
                                        <div class="mb-5">
                                            <h5 class="font-semibold text-lg mb-4">Payment History</h5>
                                            <p>
                                                Changes to your <span class="text-primary">Payment Method</span> information
                                                will take effect starting with
                                                scheduled payment and will be refelected on your next invoice.
                                            </p>
                                        </div>
                                        <div class="mb-5">
                                            <div class="border-b border-[#ebedf2] dark:border-[#1b2e4b]">
                                                <div class="flex items-start justify-between py-3">
                                                    <div class="flex-none ltr:mr-4 rtl:ml-4">
                                                        <img src="/assets/images/card-americanexpress.svg" alt="" />
                                                    </div>
                                                    <h6 class="text-[#515365] font-bold dark:text-white-dark text-[15px]">
                                                        Mastercard
                                                        <span
                                                            class="block text-white-dark dark:text-white-light font-normal text-xs mt-1">XXXX
                                                            XXXX XXXX 9704</span>
                                                    </h6>
                                                    <div class="flex items-start justify-between ltr:ml-auto rtl:mr-auto">
                                                        <button class="btn btn-dark">Edit</button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="border-b border-[#ebedf2] dark:border-[#1b2e4b]">
                                                <div class="flex items-start justify-between py-3">
                                                    <div class="flex-none ltr:mr-4 rtl:ml-4">
                                                        <img src="/assets/images/card-mastercard.svg" alt="" />
                                                    </div>
                                                    <h6 class="text-[#515365] font-bold dark:text-white-dark text-[15px]">
                                                        American Express<span
                                                            class="block text-white-dark dark:text-white-light font-normal text-xs mt-1">XXXX
                                                            XXXX XXXX 310</span>
                                                    </h6>
                                                    <div class="flex items-start justify-between ltr:ml-auto rtl:mr-auto">
                                                        <button class="btn btn-dark">Edit</button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <div class="flex items-start justify-between py-3">
                                                    <div class="flex-none ltr:mr-4 rtl:ml-4">
                                                        <img src="/assets/images/card-visa.svg" alt="" />
                                                    </div>
                                                    <h6 class="text-[#515365] font-bold dark:text-white-dark text-[15px]">
                                                        Visa<span
                                                            class="block text-white-dark dark:text-white-light font-normal text-xs mt-1">XXXX
                                                            XXXX XXXX 5264</span>
                                                    </h6>
                                                    <div class="flex items-start justify-between ltr:ml-auto rtl:mr-auto">
                                                        <button class="btn btn-dark">Edit</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <button class="btn btn-primary">Add Payment Method</button>
                                    </div>
                                </div>
                                <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
                                    <div class="panel">
                                        <div class="mb-5">
                                            <h5 class="font-semibold text-lg mb-4">Add Billing Address</h5>
                                            <p>Changes your New <span class="text-primary">Billing</span> Information.</p>
                                        </div>
                                        <div class="mb-5">
                                            <form>
                                                <div class="mb-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                    <div>
                                                        <label for="billingName">Name</label>
                                                        <input id="billingName" type="text" placeholder="Enter Name"
                                                            class="form-input" />
                                                    </div>
                                                    <div>
                                                        <label for="billingEmail">Email</label>
                                                        <input id="billingEmail" type="email" placeholder="Enter Email"
                                                            class="form-input" />
                                                    </div>
                                                </div>
                                                <div class="mb-5">
                                                    <label for="billingAddress">Address</label>
                                                    <input id="billingAddress" type="text" placeholder="Enter Address"
                                                        class="form-input" />
                                                </div>
                                                <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-5">
                                                    <div class="md:col-span-2">
                                                        <label for="billingCity">City</label>
                                                        <input id="billingCity" type="text" placeholder="Enter City"
                                                            class="form-input" />
                                                    </div>
                                                    <div>
                                                        <label for="billingState">State</label>
                                                        <select id="billingState" class="form-select text-white-dark">
                                                            <option>Choose...</option>
                                                            <option>...</option>
                                                        </select>
                                                    </div>
                                                    <div>
                                                        <label for="billingZip">Zip</label>
                                                        <input id="billingZip" type="text" placeholder="Enter Zip"
                                                            class="form-input" />
                                                    </div>
                                                </div>
                                                <button type="button" class="btn btn-primary">Add</button>
                                            </form>
                                        </div>
                                    </div>
                                    <div class="panel">
                                        <div class="mb-5">
                                            <h5 class="font-semibold text-lg mb-4">Agregar método de pago</h5>
                                            <p>Cambia la información de tu <span class="text-primary">método de pago</span></p>
                                        </div>
                                        <div class="mb-5">
                                            <form>
                                                <div class="mb-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                    <div>
                                                        <label for="payBrand">Card Brand</label>
                                                        <select id="payBrand" class="form-select text-white-dark">
                                                            <option selected>Mastercard</option>
                                                            <option>American Express</option>
                                                            <option>Visa</option>
                                                            <option>Discover</option>
                                                        </select>
                                                    </div>
                                                    <div>
                                                        <label for="payNumber">Card Number</label>
                                                        <input id="payNumber" type="text" placeholder="Card Number"
                                                            class="form-input" />
                                                    </div>
                                                </div>
                                                <div class="mb-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                    <div>
                                                        <label for="payHolder">Holder Name</label>
                                                        <input id="payHolder" type="text" placeholder="Holder Name"
                                                            class="form-input" />
                                                    </div>
                                                    <div>
                                                        <label for="payCvv">CVV/CVV2</label>
                                                        <input id="payCvv" type="text" placeholder="CVV"
                                                            class="form-input" />
                                                    </div>
                                                </div>
                                                <div class="mb-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                    <div>
                                                        <label for="payExp">Card Expiry</label>
                                                        <input id="payExp" type="text" placeholder="Card Expiry"
                                                            class="form-input" />
                                                    </div>
                                                </div>
                                                <button type="button" class="btn btn-primary">Add</button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </TabPanel>

                        <TabPanel>
                            <div class="switch">
                                <div class="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
                                    <div class="panel space-y-5">
                                        <h5 class="font-semibold text-lg mb-4">Choose Theme</h5>
                                        <div class="flex justify-around">
                                            <label class="inline-flex cursor-pointer">
                                                <input class="form-radio ltr:mr-4 rtl:ml-4 cursor-pointer" type="radio"
                                                    name="flexRadioDefault" checked />
                                                <span>
                                                    <img class="ms-3" width="100" height="68" alt="settings-dark"
                                                        src="/assets/images/settings-light.svg" />
                                                </span>
                                            </label>

                                            <label class="inline-flex cursor-pointer">
                                                <input class="form-radio ltr:mr-4 rtl:ml-4 cursor-pointer" type="radio"
                                                    name="flexRadioDefault" />
                                                <span>
                                                    <img class="ms-3" width="100" height="68" alt="settings-light"
                                                        src="/assets/images/settings-dark.svg" />
                                                </span>
                                            </label>
                                        </div>
                                    </div>
                                    <div class="panel space-y-5">
                                        <h5 class="font-semibold text-lg mb-4">Activity data</h5>
                                        <p>Download your Summary, Task and Payment History Data</p>
                                        <button type="button" class="btn btn-primary">Download Data</button>
                                    </div>
                                </div>
                                <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
                                    <div class="panel space-y-5">
                                        <h5 class="font-semibold text-lg mb-4">Public Profile</h5>
                                        <p>Your <span class="text-primary">Profile</span> will be visible to anyone on the
                                            network.</p>
                                        <label class="w-12 h-6 relative">
                                            <input type="checkbox"
                                                class="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer"
                                                id="custom_switch_checkbox1" />
                                            <span for="custom_switch_checkbox1"
                                                class="bg-[#ebedf2] dark:bg-dark block h-full rounded-full before:absolute before:left-1 before:bg-white dark:before:bg-white-dark dark:peer-checked:before:bg-white before:bottom-1 before:w-4 before:h-4 before:rounded-full peer-checked:before:left-7 peer-checked:bg-primary before:transition-all before:duration-300"></span>
                                        </label>
                                    </div>
                                    <div class="panel space-y-5">
                                        <h5 class="font-semibold text-lg mb-4">Show my email</h5>
                                        <p>Your <span class="text-primary">Email</span> will be visible to anyone on the
                                            network.</p>
                                        <label class="w-12 h-6 relative">
                                            <input type="checkbox"
                                                class="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer"
                                                id="custom_switch_checkbox2" />
                                            <span for="custom_switch_checkbox2"
                                                class="bg-[#ebedf2] dark:bg-dark block h-full rounded-full before:absolute before:left-1 before:bg-white dark:before:bg-white-dark dark:peer-checked:before:bg-white before:bottom-1 before:w-4 before:h-4 before:rounded-full peer-checked:before:left-7 peer-checked:bg-primary before:transition-all before:duration-300"></span>
                                        </label>
                                    </div>
                                    <div class="panel space-y-5">
                                        <h5 class="font-semibold text-lg mb-4">Enable keyboard shortcuts</h5>
                                        <p>When enabled, press <span class="text-primary">ctrl</span> for help</p>
                                        <label class="w-12 h-6 relative">
                                            <input type="checkbox"
                                                class="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer"
                                                id="custom_switch_checkbox3" />
                                            <span for="custom_switch_checkbox3"
                                                class="bg-[#ebedf2] dark:bg-dark block h-full rounded-full before:absolute before:left-1 before:bg-white dark:before:bg-white-dark dark:peer-checked:before:bg-white before:bottom-1 before:w-4 before:h-4 before:rounded-full peer-checked:before:left-7 peer-checked:bg-primary before:transition-all before:duration-300"></span>
                                        </label>
                                    </div>
                                    <div class="panel space-y-5">
                                        <h5 class="font-semibold text-lg mb-4">Hide left navigation</h5>
                                        <p>Sidebar will be <span class="text-primary">hidden</span> by default</p>
                                        <label class="w-12 h-6 relative">
                                            <input type="checkbox"
                                                class="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer"
                                                id="custom_switch_checkbox4" />
                                            <span for="custom_switch_checkbox4"
                                                class="bg-[#ebedf2] dark:bg-dark block h-full rounded-full before:absolute before:left-1 before:bg-white dark:before:bg-white-dark dark:peer-checked:before:bg-white before:bottom-1 before:w-4 before:h-4 before:rounded-full peer-checked:before:left-7 peer-checked:bg-primary before:transition-all before:duration-300"></span>
                                        </label>
                                    </div>
                                    <div class="panel space-y-5">
                                        <h5 class="font-semibold text-lg mb-4">Advertisements</h5>
                                        <p>Display <span class="text-primary">Ads</span> on your dashboard</p>
                                        <label class="w-12 h-6 relative">
                                            <input type="checkbox"
                                                class="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer"
                                                id="custom_switch_checkbox5" />
                                            <span for="custom_switch_checkbox5"
                                                class="bg-[#ebedf2] dark:bg-dark block h-full rounded-full before:absolute before:left-1 before:bg-white dark:before:bg-white-dark dark:peer-checked:before:bg-white before:bottom-1 before:w-4 before:h-4 before:rounded-full peer-checked:before:left-7 peer-checked:bg-primary before:transition-all before:duration-300"></span>
                                        </label>
                                    </div>
                                    <div class="panel space-y-5">
                                        <h5 class="font-semibold text-lg mb-4">Social Profile</h5>
                                        <p>Enable your <span class="text-primary">social</span> profiles on this network</p>
                                        <label class="w-12 h-6 relative">
                                            <input type="checkbox"
                                                class="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer"
                                                id="custom_switch_checkbox6" />
                                            <span for="custom_switch_checkbox6"
                                                class="bg-[#ebedf2] dark:bg-dark block h-full rounded-full before:absolute before:left-1 before:bg-white dark:before:bg-white-dark dark:peer-checked:before:bg-white before:bottom-1 before:w-4 before:h-4 before:rounded-full peer-checked:before:left-7 peer-checked:bg-primary before:transition-all before:duration-300"></span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </TabPanel>

                        <TabPanel>
                            <div class="switch">
                                <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
                                    <div class="panel space-y-5">
                                        <h5 class="font-semibold text-lg mb-4">Purge Cache</h5>
                                        <p>Remove the active resource from the cache without waiting for the predetermined
                                            cache expiry time.</p>
                                        <button class="btn btn-secondary">Clear</button>
                                    </div>
                                    <div class="panel space-y-5">
                                        <h5 class="font-semibold text-lg mb-4">Deactivate Account</h5>
                                        <p>You will not be able to receive messages, notifications for up to 24 hours.</p>
                                        <label class="w-12 h-6 relative">
                                            <input type="checkbox"
                                                class="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer"
                                                id="custom_switch_checkbox7" />
                                            <span for="custom_switch_checkbox7"
                                                class="bg-[#ebedf2] dark:bg-dark block h-full rounded-full before:absolute before:left-1 before:bg-white dark:before:bg-white-dark dark:peer-checked:before:bg-white before:bottom-1 before:w-4 before:h-4 before:rounded-full peer-checked:before:left-7 peer-checked:bg-primary before:transition-all before:duration-300"></span>
                                        </label>
                                    </div>
                                    <div class="panel space-y-5">
                                        <h5 class="font-semibold text-lg mb-4">Delete Account</h5>
                                        <p>Once you delete the account, there is no going back. Please be certain.</p>
                                        <button class="btn btn-danger btn-delete-account">Delete my account</button>
                                    </div>
                                </div>
                            </div>
                        </TabPanel>
                        <div class="flex flex-wrap justify-end gap-2 mt-5">
                            <button type="submit" class="btn btn-primary" :disabled="loading">Save</button>
                        </div>
                    </form>
                </TabPanels>
            </TabGroup>
        </div>
    </div>
</template>
<script lang="ts" setup>

    import { ref, reactive, onMounted } from 'vue';
    import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue';
    import { useI18n } from 'vue-i18n';
    import { useMeta } from '@/composables/use-meta';
    import { useRoute, useRouter } from 'vue-router';
    import Swal from 'sweetalert2';
    import apiConfigurations from './partials/apisComponent.vue';
    import { API } from '@/services/api';
    import UsersComponent from "@/views/sass/partials/usersComponent.vue";
    const api = new API();
    const route = useRoute();
    const router = useRouter();
    const file = ref();
    const image = ref();

    useMeta({ title: 'Company' });

    const loading = ref(false);

    const companyData = ref(
        {
            name: null,
            identification: null,
            email: null,
            address: null,
            phone: null,
            logo: '/assets/images/file-preview.svg',
            web: null,
            settings: {
                user_tracking: null,
                password_tracking: null,
                user_api_hash: null,
                user_api_devices: false,
                sync_time: null,
                last_devices: null,
                sync_driver: null,
                email_host: null,
                email_port: null,
                email_username: null,
                email_password: null,
                email_encryption: null,
                email_from_address: null,
                email_from_name: null,
                email_subject: null,
                email_message: null,
                whatsapp_token: null,
                whatsapp_sender: null,
                whatsapp_message: null,
                whatsapp_template: null,
                whatsapp_version: "v16.0"
            },
            users:[],
            user_data:[]
        }
    );

    const getData = async () => {
        try {
            const response = await api.get(`sass/v1/companies/${route.params.id}`);
                const data = response.data;
                companyData.value=data
                image.value = data.avatar;
        } catch (error) {
            loading.value = true;
            console.error(error.response);
        }
    };

    const editCompany = async () => {
        loading.value = true;
        try {
            const response = await api.put(`sass/v1/companies/${route.params.id}`, companyData.value);
            loading.value = false;
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Updating...',
                padding: '2em',
                customClass: 'sweet-alerts',
            }).then(() => {
                router.push({name: 'companies'});
            });
        } catch (error) {
            console.error(error.response)
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Error updating: ' + error.response,
                padding: '2em',
                customClass: 'sweet-alerts',
            });
            loading.value = false;
        }
    }

    const uploadedFile = ref({
        file: '',
        company_id: route.params.id,
        pathOld: companyData.value.logo
    });

    const handleFileUpload = async (event) => {
        try {
            loading.value = true
            uploadedFile.value.file = event.target.files[0];
            let formData = new FormData();
            formData.append('file', uploadedFile.value.file);
            formData.append('company_id', uploadedFile.value.company_id);
            formData.append('pathOld', uploadedFile.value.pathOld);
            const response = await api.post(`sass/v1/companies/images`, formData);
            companyData.value.logo = response.data.data.link;
            image.value = response.data.data.url;
            loading.value = false
        } catch (e) {
            console.log(e)
            loading.value = false
        }
    };

    onMounted(async () => {
        await getData();
    });
</script>
