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
                <span>{{ employee.first_name }}</span>
            </li>
        </ul>

        <div class="panel mt-3 pt-5">
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
                            Cambio de Contraseña
                        </a>
                    </Tab>
                    <Tab as="template" v-slot="{ selected }">
                        <a href="javascript:;"
                           class="flex gap-2 p-4 border-b border-transparent hover:border-primary hover:text-primary !outline-none"
                           :class="{ '!border-primary text-primary': selected }">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M14.5 19.9815C16.0728 19.9415 17.1771 19.815 18 19.4151V20.9999C18 21.5522 17.5523 21.9999 17 21.9999H15.5C14.9477 21.9999 14.5 21.5522 14.5 20.9999V19.9815Z" stroke="currentColor"/>
                                <path d="M6 19.415C6.82289 19.815 7.9272 19.9415 9.5 19.9815V20.9999C9.5 21.5522 9.05228 21.9999 8.5 21.9999H7C6.44772 21.9999 6 21.5522 6 20.9999V19.415Z" stroke="currentColor"/>
                                <path opacity="0.5" fill-rule="evenodd" clip-rule="evenodd" d="M5.17157 3.17157C6.34315 2 8.22876 2 12 2C15.7712 2 17.6569 2 18.8284 3.17157C19.8915 4.23467 19.99 5.8857 19.9991 9L20 13C19.9909 16.1143 19.8915 17.7653 18.8284 18.8284C18.5862 19.0706 18.3136 19.2627 18 19.4151C17.1771 19.8151 16.0728 19.9415 14.5 19.9815C13.7729 19.9999 12.9458 20 12 20C11.0542 20 10.2271 20 9.5 19.9815C7.9272 19.9415 6.82289 19.815 6 19.415C5.68645 19.2626 5.41375 19.0706 5.17157 18.8284C4.10848 17.7653 4.00911 16.1143 4 13L4.00093 9C4.01004 5.8857 4.10848 4.23467 5.17157 3.17157Z" stroke="currentColor"/>
                                <path d="M17.75 16C17.75 15.5858 17.4142 15.25 17 15.25H15.5C15.0858 15.25 14.75 15.5858 14.75 16C14.75 16.4142 15.0858 16.75 15.5 16.75H17C17.4142 16.75 17.75 16.4142 17.75 16Z" stroke="currentColor"/>
                                <path d="M6.25 16C6.25 15.5858 6.58579 15.25 7 15.25H8.5C8.91421 15.25 9.25 15.5858 9.25 16C9.25 16.4142 8.91421 16.75 8.5 16.75H7C6.58579 16.75 6.25 16.4142 6.25 16Z" stroke="currentColor"/>
                                <path d="M5.5 9.5C5.5 10.9142 5.5 11.6213 5.93934 12.0607C6.37868 12.5 7.08579 12.5 8.5 12.5H15.5C16.9142 12.5 17.6213 12.5 18.0607 12.0607C18.5 11.6213 18.5 10.9142 18.5 9.5V6.99998C18.5 5.58578 18.5 4.87868 18.0607 4.43934C17.6213 4 16.9142 4 15.5 4H8.5C7.08579 4 6.37868 4 5.93934 4.43934C5.5 4.87868 5.5 5.58579 5.5 7V9.5Z" stroke="currentColor"/>
                                <path d="M2.4 11.8L4 13L4.00093 9H3C2.44772 9 2 9.44772 2 10V11C2 11.3148 2.14819 11.6111 2.4 11.8Z" fill="#1C274C"/>
                                <path d="M21 9H19.999L20 13L21.6 11.8C21.8518 11.6111 22 11.3148 22 11V10C22 9.44772 21.5522 9 21 9Z" fill="#1C274C"/>
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
                                                    <label for="file">Avatar</label>
                                                    <div>
                                                        <pre>{{employee.avatar}}</pre>
                                                        <file-uploader
                                                            v-model="employee.avatar"
                                                            :accept="['image/*']"
                                                            :max-size="2"
                                                            :multiple="false"
                                                            label="avatar"
                                                            class="w-full"
                                                            v-if="!loading"
                                                        />
                                                    </div>
                                                    <div class="text-center mt-6" v-if="loading">
                                                        <!-- custom loader -->
                                                        <span
                                                            class="animate-[spin_2s_linear_infinite] border-8 border-[#f1f2f3] border-l-primary border-r-primary rounded-full w-14 h-14 inline-block align-middle m-auto mb-10"></span>
                                                    </div>
                                                    <div class="text-danger mt-2" id="file"></div>
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
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div class="flex flex-wrap justify-end gap-2 mt-5">
                            <button type="button" @click="editEmployee" class="btn btn-primary" :disabled="loading">
                                Guardar
                            </button>
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
                                            <div>
                                                <div v-if="companiesOptions.length>1">
                                                    <Select
                                                        :options="companiesOptions"
                                                        v-model="companiesSelected"
                                                        :multiple="false"
                                                        required
                                                        :closeOnSelect="false"
                                                        titleSelect="Compañias"
                                                        name="companies"
                                                        @update:modelValue="handleCompanySelect"
                                                    />
                                                </div>
                                            </div>
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
                                            <!--                                            <div>
                                                                                            <label for="contract">Contrato</label>
                                                                                            <input id="contract" type="text" placeholder="Contrato"
                                                                                                   class="form-input" v-model="employee.contract" required/>
                                                                                        </div>-->
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
                                                <input id="key" type="text" placeholder="Llave"
                                                       v-model="employee.key"
                                                       class="form-input"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="flex flex-wrap justify-end gap-2 mt-5">
                            <button type="button" @click="editEmployee" class="btn btn-primary" :disabled="loading">
                                Guardar
                            </button>
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div>
                            <div class="panel pb-1.5 mt-6">
                                <form @submit.prevent="editPassword">
                                    <div
                                        class="border border-[#ebedf2] dark:border-[#191e3a] rounded-md p-4 mb-2 bg-white dark:bg-[#0e1726]">
                                        <h6 class="text-lg font-bold mb-5">Cambiar Contraseña</h6>
                                        <div class="flex flex-col sm:flex-row">
                                            <div class="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-5">
                                                <div>
                                                    <label for="password">Contraseña *</label>
                                                    <input id="password" type="password" placeholder="Nueva Contraseña"
                                                           class="form-input" v-model="newPassword"
                                                           @input="validatePassword" required/>
                                                    <ul v-if="passwordError.length" class="text-red-500">
                                                        <li v-for="(item,i) in passwordError" :key="i">
                                                            {{ item }}
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div>
                                                    <label for="cpassword">Confirmar Contraseña *</label>
                                                    <input id="cpassword" type="password"
                                                           placeholder="Confirmar Contraseña"
                                                           class="form-input" v-model="confirmPassword"
                                                           @input="validateConfirmPassword" required/>
                                                    <span v-if="confirmPasswordError" class="text-red-500">{{
                                                            confirmPasswordError
                                                        }}</span>
                                                </div>
                                                <div class="mt-6">
                                                    <h6 class="mb-3">o enviar un correo para restablecer la
                                                        contraseña</h6>
                                                    <button @click="sendResetPassword" type="button"
                                                            class="btn btn-outline-primary">
                                                        Enviar correo para restablecer contraseña.
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="flex flex-wrap justify-end gap-2 mt-5">
                                            <button
                                                type="submit"
                                                class="btn btn-primary"
                                                :disabled="isDisabled"
                                            >
                                                Guardar
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div class="panel pb-1.5 mt-6" v-if="tokenData.length">
                                <h6 class="text-lg font-bold mb-5">User API Hash</h6>

                                <div class="flex mt-3" v-for="token in tokenData" :key="token.id">
                                    <input :id="`user_api_hash_${token.id}`"
                                           :type="showPasswords[token.id] ? 'text' : 'password'"
                                           class="form-input ltr:rounded-r-none rtl:rounded-l-none"
                                           v-model="token.access_token"
                                           readonly/>
                                    <div
                                        class="bg-[#eee] flex justify-center items-center ltr:rounded-r-md rtl:rounded-l-md px-3 font-semibold border ltr:border-l-0 rtl:border-r-0 border-[#e0e6ed] dark:border-[#17263c] dark:bg-[#1b2e4b]">
                                        <label class="w-7 h-4 relative cursor-pointer mb-0">
                                            <input type="checkbox"
                                                   :id="`user_api_hash_check_${token.id}`"
                                                   v-model="showPasswords[token.id]"
                                                   @click="togglePasswordVisibility(token.id)"
                                                   class="peer absolute w-full h-full opacity-0 z-10 focus:ring-0 focus:outline-none cursor-pointer"/>
                                            <span
                                                class="rounded-full border border-[#adb5bd] bg-white peer-checked:bg-primary peer-checked:border-primary dark:bg-dark block h-full before:absolute ltr:before:left-0.5 rtl:before:right-0.5 ltr:peer-checked:before:left-3.5 rtl:peer-checked:before:right-3.5 peer-checked:before:bg-white before:bg-[#adb5bd] dark:before:bg-white-dark before:bottom-[2px] before:w-3 before:h-3 before:rounded-full before:transition-all before:duration-300"></span>
                                        </label>
                                    </div>
                                    <button type="button" class="btn btn-info" @click="copy(token.access_token)">
                                        <svg
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                            class="w-5 h-5 ltr:mr-2 rtl:ml-2"
                                        >
                                            <path
                                                d="M6 11C6 8.17157 6 6.75736 6.87868 5.87868C7.75736 5 9.17157 5 12 5H15C17.8284 5 19.2426 5 20.1213 5.87868C21 6.75736 21 8.17157 21 11V16C21 18.8284 21 20.2426 20.1213 21.1213C19.2426 22 17.8284 22 15 22H12C9.17157 22 7.75736 22 6.87868 21.1213C6 20.2426 6 18.8284 6 16V11Z"
                                                stroke="currentColor"
                                                stroke-width="1.5"
                                            />
                                            <path
                                                opacity="0.5"
                                                d="M6 19C4.34315 19 3 17.6569 3 16V10C3 6.22876 3 4.34315 4.17157 3.17157C5.34315 2 7.22876 2 11 2H15C16.6569 2 18 3.34315 18 5"
                                                stroke="currentColor"
                                                stroke-width="1.5"
                                            />
                                        </svg>
                                        Copiar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <driver-card-component :driver-id="employee.id" v-if="!loading"/>
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
import FileUploader from "@/components/partials/FileUploader.vue";
import useClipboard from "vue-clipboard3";

const api = new API();
const route = useRoute();
const router = useRouter();
const file = ref();
const image = ref();
const store = useAppStore();
const userStore = useUserStore()
const accordians: any = ref()
useMeta({title: 'Editar Colaborador'});
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

const showPasswords = ref({});
const newPassword = ref('');
const confirmPassword = ref('');
const passwordError = ref([]);
const confirmPasswordError = ref(null);
const tokenData = ref([]);
const error = ref(true)
const employee = ref(
    {
        id: null,
        first_name: null,
        last_name: null,
        email: null,
        is_activated: true,
        identification: null,
        phone: null,
        address: null,
        birthdate: null,
        hire_date: null,
        emergency_contact: null,
        status: null,
        key: null,
        company_id: null,
        position_id: null,
        department_id: null,
        roles: [],
        avatar: null,
    }
);
const getEmployee = async () => {
    try {
        loading.value = true
        await api.get(`rh/v1/employees/${route.params.id}`).then((response) => {
            employee.value.id = response.data?.id ?? null;
            employee.value.first_name = response.data?.user?.first_name ?? null;
            employee.value.last_name = response.data.user?.last_name ?? null;
            employee.value.email = response.data.user?.email ?? null;
            employee.value.identification = response.data.identification ?? '';
            employee.value.phone = response.data.phone ?? null;
            employee.value.address = response.data.address ?? null;
            employee.value.birthdate = response.data.birthdate ?? null;
            employee.value.hire_date = response.data.hire_date ?? null;
            employee.value.emergency_contact = response.data.emergency_contact ?? null;
            employee.value.status = response.data.status ?? null;
            employee.value.key = response.data.key ?? null;
            employee.value.company_id = response.data.company_id ?? null;
            employee.value.position_id = response.data.position_id ?? null;
            employee.value.department_id = response.data.department_id ?? null;
            employee.value.roles = response.data.user?.roles ?? [3];
            employee.value.avatar = {
                name: 'avatar',
                type: 'image',
                url: response.data.user?.avatar ?? '/assets/images/file-preview.svg',
            };
            tokenData.value = response.data.user?.api_token ?? [];
            if (response.data.company_id !== undefined) {
                companiesSelected.value = {label: response.data.company?.name, value: response.data.company?.id};
            }
            if (response.data.position_id !== undefined) {
                positionSelected.value = {label: response.data.position.name, value: response.data.position.id};
            }
            if (response.data.department_id !== undefined) {
                departmentSelected.value = {label: response.data.department.name, value: response.data.department.id};
            }

            loading.value = false
        });

    } catch (e) {
        console.error(e)
        loading.value = false
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
    passwordError.value = [];
    const hasMinimumLength = newPassword.value.length >= 8;
    const hasUppercase = /[A-Z]/.test(newPassword.value);
    const hasNumber = /\d/.test(newPassword.value);
    const hasSpecialChar = /[!@#$%^&*]/.test(newPassword.value);
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
    if (confirmPassword.value !== newPassword.value) {
        confirmPasswordError.value = 'Las contraseñas no coinciden.';
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
    try {
        loading.value = true;
        console.log(employee.value)
        const response = await api.putForm(`rh/v1/employees/${route.params.id}`, employee.value);
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
};
const userData = ref(
    {
        password: null,
        password_confirmation: null,
    }
);
const editPassword = async () => {
    try {
        validatePassword()
        if (error.value) {
            return
        }
        loading.value = true;
        userData.value.password = newPassword.value
        userData.value.password_confirmation = confirmPassword.value
        const response = await api.post(`user/users/${route.params.id}/edit`, userData.value);
        loading.value = false;
        Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Updating...',
            padding: '2em',
            customClass: 'sweet-alerts',
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
const isDisabled = computed(() => {
    return loading.value || !!passwordError.value || !!confirmPasswordError.value;
});
const sendResetPassword = async () => {
    try {
        const response = await api.post('auth/reset', employee.value.email);
        console.log(response.data);
        // Handle success
    } catch (error) {
        console.error(error);
        // Handle error
    }
};
const togglePasswordVisibility = (tokenId) => {
    showPasswords.value[tokenId] = !showPasswords.value[tokenId];
};
const {toClipboard} = useClipboard();
const copy = async (msg) => {
    if (msg) {
        await toClipboard(msg);
        showMessage('Copiado exitosamente.');
    }
};
const showMessage = (msg = '', type = 'success') => {
    const toast: any = Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 3000,
        customClass: {container: 'toast'},
    });
    toast.fire({
        icon: type,
        title: msg,
        padding: '10px 20px',
    });
};
watch(() => companyStore.companiesSelect, async (value) => {
    if (companyStore.id !== undefined) {
        companiesSelected.value = {label: companyStore.name, value: companyStore.id}
    }
    employee.value.company_id = companyStore.id
});
function handleCompanySelect() {
    employee.value.company_id = companiesSelected.value.value;
}

onMounted(async () => {
    getEmployee();
    // getCompanies();
    // getPositions();
    // getDepartments();
});

</script>
