<template>
  <div>
    <ul class="flex space-x-2 rtl:space-x-reverse">
      <li>
        <router-link :to="{name:'dashboard'}" class="text-primary hover:underline">
          Escritorio
        </router-link>
      </li>
      <li class="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
        <router-link :to="{name:'employees'}" class="text-primary hover:underline">
          Colaboradores
        </router-link>
      </li>
      <li class="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
        <span>Nuevo Colaborador</span>
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
                      stroke="currentColor" stroke-width="1.5"/>
                <path d="M12 15L12 18" stroke="currentColor" stroke-width="1.5"
                      stroke-linecap="round"/>
              </svg>
              Información General
            </a>
          </Tab>

          <Tab as="template" v-slot="{ selected }">
            <a href="javascript:;"
               class="flex gap-2 p-4 border-b border-transparent hover:border-primary hover:text-primary !outline-none"
               :class="{ '!border-primary text-primary': selected }">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                   xmlns="http://www.w3.org/2000/svg" class="w-5 h-5">
                <circle opacity="0.5" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5"/>
                <path d="M12 6V18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                <path
                    d="M15 9.5C15 8.11929 13.6569 7 12 7C10.3431 7 9 8.11929 9 9.5C9 10.8807 10.3431 12 12 12C13.6569 12 15 13.1193 15 14.5C15 15.8807 13.6569 17 12 17C10.3431 17 9 15.8807 9 14.5"
                    stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
              </svg>
              Información Empresarial
            </a>
          </Tab>

          <Tab as="template" v-slot="{ selected }">
            <a href="javascript:;"
               class="flex gap-2 p-4 border-b border-transparent hover:border-primary hover:text-primary !outline-none"
               :class="{ '!border-primary text-primary': selected }">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                   xmlns="http://www.w3.org/2000/svg" class="w-5 h-5">
                <circle cx="12" cy="6" r="4" stroke="currentColor" stroke-width="1.5"/>
                <ellipse opacity="0.5" cx="12" cy="17" rx="7" ry="4" stroke="currentColor"
                         stroke-width="1.5"/>
              </svg>
              Informe de Conducción
            </a>
          </Tab>
          <!--                   <Tab as="template" v-slot="{ selected }" disabled>
                                <a href="javascript:;"
                                   class="flex gap-2 p-4 border-b border-transparent hover:border-primary hover:text-primary !outline-none"
                                   :class="{ '!border-primary text-primary': selected }">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                         xmlns="http://www.w3.org/2000/svg" class="w-5 h-5">
                                        <circle opacity="0.5" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5"/>
                                        <path d="M12 6V18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                                        <path
                                            d="M15 9.5C15 8.11929 13.6569 7 12 7C10.3431 7 9 8.11929 9 9.5C9 10.8807 10.3431 12 12 12C13.6569 12 15 13.1193 15 14.5C15 15.8807 13.6569 17 12 17C10.3431 17 9 15.8807 9 14.5"
                                            stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                                    </svg>
                                    Payment Details
                                </a>
                            </Tab>-->
        </TabList>
        <TabPanels>
          <form @submit.prevent="editEmployee">
            <TabPanel>
              <div>
                <div class="panel pb-1.5 mt-6">
                  <div
                      class="border border-[#ebedf2] dark:border-[#191e3a] rounded-md p-4 mb-2 bg-white dark:bg-[#0e1726]">
                    <h6 class="text-lg font-bold mb-5">Información General</h6>
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
                          <div class="flex flex-col justify-center items-center">
                            <img :src="employee.avatar" :alt="employee.avatar"
                                 class="w-100 h-100 object-cover mb-5 p-6"/>
                          </div>
                        </div>
                      </div>
                      <div class="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label for="first_name">Nombre *</label>
                          <input id="first_name" type="text" placeholder="Nombre"
                                 class="form-input" v-model="employee.first_name" required/>
                        </div>
                        <div>
                          <label for="last_name">Apellidos *</label>
                          <input id="last_name" type="text" placeholder="Apellidos"
                                 class="form-input" v-model="employee.last_name" required/>
                        </div>
                        <div>
                          <label for="identification">Identificación *</label>
                          <input id="identification" type="text"
                                 placeholder="Identificación"
                                 v-maska="'##########'"
                                 class="form-input" v-model="employee.identification"
                                 required/>
                        </div>
                        <div>
                          <label for="address">Dirección *</label>
                          <input id="address" type="text" placeholder="Dirección"
                                 class="form-input" v-model="employee.address" required/>
                        </div>
                        <div>
                          <label for="phone">Teléfono *</label>
                          <input id="phone" type="text" placeholder="+57 300 000000"
                                 class="form-input" v-model="employee.phone" required
                                 v-maska="'+## ### #######'"/>
                        </div>
                        <div>
                          <label for="email">Email *</label>
                          <input id="email" type="email" placeholder="info@ejemplo.com"
                                 class="form-input" v-model="employee.email" required/>
                          <!--                                                      <template v-if="!$v.employee.name.$error">
                                                                                      <p class="text-[#1abc9c] mt-1">Looks Good!</p>
                                                                                  </template>
                                                                                  <template v-if="$v.employee.name.$error">
                                                                                      <p class="text-danger mt-1">Email Invalido</p>
                                                                                  </template>
                                                                                  -->
                        </div>
                        <div>
                          <div v-if="companiesOptions.length>1">
                            <Select
                                :options="companiesOptions"
                                v-model="companiesSelected"
                                :multiple="true"
                                required
                                :closeOnSelect="false"
                                titleSelect="Compañias"
                                name="companies"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
              <div class="flex flex-wrap justify-end gap-2 mt-5">
                <button type="submit" class="btn btn-primary" :disabled="loading">Guardar</button>
              </div>
            </TabPanel>
            <TabPanel>
              <div>
                <div class="panel pb-1.5 mt-6">
                  <div
                      class="border border-[#ebedf2] dark:border-[#191e3a] rounded-md p-4 mb-2 bg-white dark:bg-[#0e1726]">
                    <h6 class="text-lg font-bold mb-5">Información Empresarial</h6>
                    <div class="flex flex-col sm:flex-row">
                      <div class="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div v-if="positionOptions.length>1">
                          <Select
                              :options="positionOptions"
                              v-model="positionSelected"
                              :multiple="false"
                              required
                              :closeOnSelect="false"
                              titleSelect="Cargo"
                              name="position"
                          />
                        </div>
                        <div v-if="departmentOptions.length">
                          <Select
                              :options="departmentOptions"
                              v-model="departmentSelected"
                              :multiple="false"
                              required
                              :closeOnSelect="false"
                              titleSelect="Departamento *"
                              name="department"
                          />
                        </div>
                        <div>
                          <label for="contract">Contrato</label>
                          <input id="contract" type="text" placeholder="Contrato"
                                 class="form-input" v-model="employee.contract" required/>
                        </div>
                        <div>
                          <label for="hire_date">Fecha de Contratación</label>
                          <flat-pickr v-model="employee.hire_date" class="form-input"
                                      :config="rangeCalendar"/>
                        </div>
                        <div>
                          <label for="emergency_contact">Contacto de Emergencia</label>
                          <input id="emergency_contact" type="text"
                                 placeholder="Contacto de Emergencia"
                                 class="form-input" v-model="employee.emergency_contact"
                                 v-maska="'+## ### #######'"/>
                        </div>
                        <div>
                          <label for="key">Llave</label>
                          <input id="key" type="text" placeholder="Llave" v-model="employee.key"
                                 class="form-input"/>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="flex flex-wrap justify-end gap-2 mt-5">
                <button type="submit" class="btn btn-primary" :disabled="loading">Guardar</button>
              </div>
            </TabPanel>
          </form>
          <TabPanel>
            <div>
              <div class="panel pb-1.5 mt-6">
                <div
                    class="border border-[#ebedf2] dark:border-[#191e3a] rounded-md p-4 mb-2 bg-white dark:bg-[#0e1726]">
                  <h6 class="text-lg font-bold mb-5">Cambiar Contraseña</h6>
                  <div class="flex flex-col sm:flex-row">
                    <div class="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div
                          :class="{ 'has-error': passwordError.length, 'has-success': !passwordError.length }">
                        <label for="password">Contraseña *</label>
                        <input id="password" type="password" placeholder="New Password"
                               class="form-input" v-model="employee.password"
                               @input="validatePassword" required/>
                        <ul v-if="passwordError.length" class="text-red-500">
                          <li v-for="(item,i) in passwordError" :key="i">
                            {{ item }}
                          </li>
                        </ul>
                      </div>
                      <div
                          :class="{ 'has-error': !confirmPasswordError, 'has-success': confirmPasswordError }">
                        <label for="cpassword">Confirmar Contraseña *</label>
                        <input id="cpassword" type="password"
                               placeholder="Confirmar Contraseña"
                               class="form-input" v-model="employee.password_confirmation"
                               @input="validateConfirmPassword" required/>
                        <span v-if="confirmPasswordError" class="text-red-500">
                                                        {{ confirmPasswordError }}
                                                    </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex flex-wrap justify-end gap-2 mt-5">
              <button type="submit" class="btn btn-primary" :disabled="loading">Guardar</button>
            </div>
          </TabPanel>
          <TabPanel>
            <driver-card-component/>
          </TabPanel>
          <TabPanel>
            <div>
              <div class="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
                <div class="panel">
                  <div class="mb-5">
                    <h5 class="font-semibold text-lg mb-4">Dirección de Facturación</h5>
                    <p>
                      Los cambios en su información de <span
                        class="text-primary">facturación</span>
                      entrarán en vigencia a partir del pago programado y se reflejarán en su
                      próxima factura.
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
                        <div
                            class="flex items-start justify-between ltr:ml-auto rtl:mr-auto">
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
                        <div
                            class="flex items-start justify-between ltr:ml-auto rtl:mr-auto">
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
                        <div
                            class="flex items-start justify-between ltr:ml-auto rtl:mr-auto">
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
                      Changes to your <span class="text-primary">Payment Method</span>
                      information
                      will take effect starting with
                      scheduled payment and will be refelected on your next invoice.
                    </p>
                  </div>
                  <div class="mb-5">
                    <div class="border-b border-[#ebedf2] dark:border-[#1b2e4b]">
                      <div class="flex items-start justify-between py-3">
                        <div class="flex-none ltr:mr-4 rtl:ml-4">
                          <img src="/assets/images/card-americanexpress.svg" alt=""/>
                        </div>
                        <h6 class="text-[#515365] font-bold dark:text-white-dark text-[15px]">
                          Mastercard
                          <span
                              class="block text-white-dark dark:text-white-light font-normal text-xs mt-1">XXXX
                                                            XXXX XXXX 9704</span>
                        </h6>
                        <div
                            class="flex items-start justify-between ltr:ml-auto rtl:mr-auto">
                          <button class="btn btn-dark">Edit</button>
                        </div>
                      </div>
                    </div>
                    <div class="border-b border-[#ebedf2] dark:border-[#1b2e4b]">
                      <div class="flex items-start justify-between py-3">
                        <div class="flex-none ltr:mr-4 rtl:ml-4">
                          <img src="/assets/images/card-mastercard.svg" alt=""/>
                        </div>
                        <h6 class="text-[#515365] font-bold dark:text-white-dark text-[15px]">
                          American Express<span
                            class="block text-white-dark dark:text-white-light font-normal text-xs mt-1">XXXX
                                                            XXXX XXXX 310</span>
                        </h6>
                        <div
                            class="flex items-start justify-between ltr:ml-auto rtl:mr-auto">
                          <button class="btn btn-dark">Edit</button>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div class="flex items-start justify-between py-3">
                        <div class="flex-none ltr:mr-4 rtl:ml-4">
                          <img src="/assets/images/card-visa.svg" alt=""/>
                        </div>
                        <h6 class="text-[#515365] font-bold dark:text-white-dark text-[15px]">
                          Visa<span
                            class="block text-white-dark dark:text-white-light font-normal text-xs mt-1">XXXX
                                                            XXXX XXXX 5264</span>
                        </h6>
                        <div
                            class="flex items-start justify-between ltr:ml-auto rtl:mr-auto">
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
                    <p>Changes your New <span class="text-primary">Billing</span> Information.
                    </p>
                  </div>
                  <div class="mb-5">
                    <form>
                      <div class="mb-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label for="billingName">Name</label>
                          <input id="billingName" type="text" placeholder="Enter Name"
                                 class="form-input"/>
                        </div>
                        <div>
                          <label for="billingEmail">Email</label>
                          <input id="billingEmail" type="email" placeholder="Enter Email"
                                 class="form-input"/>
                        </div>
                      </div>
                      <div class="mb-5">
                        <label for="billingAddress">Address</label>
                        <input id="billingAddress" type="text" placeholder="Enter Address"
                               class="form-input"/>
                      </div>
                      <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-5">
                        <div class="md:col-span-2">
                          <label for="billingCity">City</label>
                          <input id="billingCity" type="text" placeholder="Enter City"
                                 class="form-input"/>
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
                                 class="form-input"/>
                        </div>
                      </div>
                      <button type="button" class="btn btn-primary">Add</button>
                    </form>
                  </div>
                </div>
                <div class="panel">
                  <div class="mb-5">
                    <h5 class="font-semibold text-lg mb-4">Agregar método de pago</h5>
                    <p>Cambia la información de tu <span
                        class="text-primary">método de pago</span></p>
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
                                 class="form-input"/>
                        </div>
                      </div>
                      <div class="mb-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label for="payHolder">Holder Name</label>
                          <input id="payHolder" type="text" placeholder="Holder Name"
                                 class="form-input"/>
                        </div>
                        <div>
                          <label for="payCvv">CVV/CVV2</label>
                          <input id="payCvv" type="text" placeholder="CVV"
                                 class="form-input"/>
                        </div>
                      </div>
                      <div class="mb-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label for="payExp">Card Expiry</label>
                          <input id="payExp" type="text" placeholder="Card Expiry"
                                 class="form-input"/>
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
                             name="flexRadioDefault" checked/>
                      <span>
                                                    <img class="ms-3" width="100" height="68" alt="settings-dark"
                                                         src="/assets/images/settings-light.svg"/>
                                                </span>
                    </label>

                    <label class="inline-flex cursor-pointer">
                      <input class="form-radio ltr:mr-4 rtl:ml-4 cursor-pointer" type="radio"
                             name="flexRadioDefault"/>
                      <span>
                                                    <img class="ms-3" width="100" height="68" alt="settings-light"
                                                         src="/assets/images/settings-dark.svg"/>
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
                  <p>Your <span class="text-primary">Profile</span> will be visible to anyone on
                    the
                    network.</p>
                  <label class="w-12 h-6 relative">
                    <input type="checkbox"
                           class="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer"
                           id="custom_switch_checkbox1"/>
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
                           id="custom_switch_checkbox2"/>
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
                           id="custom_switch_checkbox3"/>
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
                           id="custom_switch_checkbox4"/>
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
                           id="custom_switch_checkbox5"/>
                    <span for="custom_switch_checkbox5"
                          class="bg-[#ebedf2] dark:bg-dark block h-full rounded-full before:absolute before:left-1 before:bg-white dark:before:bg-white-dark dark:peer-checked:before:bg-white before:bottom-1 before:w-4 before:h-4 before:rounded-full peer-checked:before:left-7 peer-checked:bg-primary before:transition-all before:duration-300"></span>
                  </label>
                </div>
                <div class="panel space-y-5">
                  <h5 class="font-semibold text-lg mb-4">Social Profile</h5>
                  <p>Enable your <span class="text-primary">social</span> profiles on this network
                  </p>
                  <label class="w-12 h-6 relative">
                    <input type="checkbox"
                           class="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer"
                           id="custom_switch_checkbox6"/>
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
                  <p>Remove the active resource from the cache without waiting for the
                    predetermined
                    cache expiry time.</p>
                  <button class="btn btn-secondary">Clear</button>
                </div>
                <div class="panel space-y-5">
                  <h5 class="font-semibold text-lg mb-4">Deactivate Account</h5>
                  <p>You will not be able to receive messages, notifications for up to 24
                    hours.</p>
                  <label class="w-12 h-6 relative">
                    <input type="checkbox"
                           class="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer"
                           id="custom_switch_checkbox7"/>
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
        </TabPanels>
      </TabGroup>
    </div>
  </div>
</template>
<script lang="ts" setup>

import {ref, reactive, onMounted, watch, computed} from 'vue';
import {TabGroup, TabList, Tab, TabPanels, TabPanel} from '@headlessui/vue';
import {useI18n} from 'vue-i18n';
import {useMeta} from '@/composables/use-meta';
import {useRoute, useRouter} from 'vue-router';
import Swal from 'sweetalert2';
import {API} from '@/services/api';
import {useUserStore} from "@/stores/user-store";
import {useCompanyStore} from "@/stores/company-store";
import Select from "@/components/partials/Select.vue";
import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';
import {Spanish} from "flatpickr/dist/l10n/es.js"
import {useAppStore} from "@/stores";
import DriverCardComponent from "@/components/drivers/DriverCardComponent.vue";

const api = new API();
const route = useRoute();
const router = useRouter();
const file = ref();
const image = ref();
const store = useAppStore();
const userStore = useUserStore()
const accordians: any = ref()
useMeta({title: 'Crear Colaborador'});
const rangeCalendar: any = ref({
  locale: Spanish,
  dateFormat: 'Y-m-d',
  inline: false,
  position: store.rtlClass === 'rtl' ? 'auto right' : 'auto left',
});
const companyStore = useCompanyStore();
const loading = ref(false);
const companiesSelected = ref({label: companyStore.name ?? '', value: companyStore.id ?? null});
const companiesOptions = ref(companyStore.companyOptions);
const positionSelected = ref({label: '', value: null});
const positionOptions = ref([]);
const departmentSelected = ref({label: '', value: null});
const departmentOptions = ref([]);

const passwordError = ref([])
const confirmPasswordError = ref(false)
const error = ref(true)
const employee = ref(
    {
      first_name: null,
      last_name: null,
      email: null,
      is_activated: true,
      password: null,
      password_confirmation: null,
      identification: null,
      phone: null,
      address: null,
      birthdate: null,
      hire_date: null,
      emergency_contact: null,
      status: null,
      key: null,
      company_id: null,
      position: null,
      department: null,
      contract: null,
      roles: [],
      avatar: '/assets/images/file-preview.svg',
    }
);
const getEmployee = () => {
  try {
    const response = api.get(`rh/v1/employees/${route.params.id}`);
    if (response.status === 200) {
      employee.value.first_name = response.data.user.first_name;
      employee.value.last_name = response.data.user.last_name;
      employee.value.email = response.data.user.email;
      employee.value.identification = response.data.identification;
      employee.value.phone = response.data.phone;
      employee.value.address = response.data.address;
      employee.value.birthdate = response.data.birthdate;
      employee.value.hire_date = response.data.hire_date;
      employee.value.emergency_contact = response.data.emergency_contact;
      employee.value.status = response.data.status;
      employee.value.key = response.data.key;
      employee.value.company_id = response.data.company_id;
      employee.value.position = response.data.position;
      employee.value.department = response.data.department;
      employee.value.contract = response.data.contract;
      employee.value.roles = response.data.roles;
      employee.value.avatar = response.data.avatar;
      companiesSelected.value = {label: response.data.company.name, value: response.data.company.id};
      positionSelected.value = {label: response.data.position.name, value: response.data.position.id};
      departmentSelected.value = {label: response.data.department.name, value: response.data.department.id};
    } else {
      throw new Error('Hubo un problema al obtener la lista de vehículos desde el API.');
    }
  }catch (e) {

  }
}
/*const rules = {
    employee: {
        email: {required, email},
    },
};*/
/*const handleSelection = (option) => {
    if (option.value !== 0) {
        employee.value.parent_id = null
    } else {
        employee.value.parent_id = option.value
    }

};*/

const validatePassword = () => {
  error.value = true
  const hasMinimumLength = employee.value.password.length >= 8;
  const hasUppercase = /[A-Z]/.test(employee.value.password);
  const hasNumber = /\d/.test(employee.value.password);
  const hasSpecialChar = /[!@#$%^&*]/.test(employee.value.password);
  if (!hasMinimumLength) passwordError.value.push('La contraseña debe tener al menos 8 caracteres.');
  if (!hasUppercase) passwordError.value.push('La contraseña debe contener al menos una letra mayúscula.');
  if (!hasNumber) passwordError.value.push('La contraseña debe contener al menos un número.');
  if (!hasSpecialChar) passwordError.value.push('La contraseña debe contener al menos un carácter especial (!@#$%^&*).');

  if (hasMinimumLength && hasUppercase && hasNumber && hasSpecialChar) {
    passwordError.value = [];
    error.value = false
  }
};
const validateConfirmPassword = () => {
  error.value = true
  if (employee.value.password_confirmation !== employee.value.password) {
    confirmPasswordError.value = 'Passwords do not match.';
  } else {
    confirmPasswordError.value = '';
    error.value = false
  }
};
const validate = () => {
  validatePassword()
  validateConfirmPassword()
}
const editEmployee = async () => {
  loading.value = true;
  validate();
  // $v.value.employee.$touch();
  if (!error) {
    try {
      const response = await api.put(`rh/v1/employees${route.params.id}`, employee.value);
      loading.value = false;
      Swal.fire({
        icon: 'success',
        title: 'Edicion Exitosa',
        padding: '2em',
        customClass: 'sweet-alerts',
      }).then(() => {
        router.push({name: 'employees'});
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
  loading.value = false;
};

const uploadedFile = ref({
  file: '',
  employee_id: route.params.id,
  pathOld: employee.value.avatar
});

const handleFileUpload = async (event) => {
  try {
    loading.value = true
    uploadedFile.value.file = event.target.files[0];
    let formData = new FormData();
    formData.append('file', uploadedFile.value.file);
    formData.append('employee_id', uploadedFile.value.employee_id);
    formData.append('pathOld', uploadedFile.value.pathOld);
    const response = await api.post(`rh/v1/employees/images`, formData);
    employee.value.avatar = response.data.data.link;
    image.value = response.data.data.url;
    loading.value = false
  } catch (e) {
    console.log(e)
    loading.value = false
  }
};

</script>
